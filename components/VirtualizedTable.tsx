"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { stockData, type StockData } from "../data/stockData"
import Image from "next/image"
import FilterDropdown from "../components/FilterDropdown"
import { useVirtualizedTable } from "../hooks/useVirtualizedTable"
import { useRouter } from "next/navigation"

// Base column proportions (these will be scaled based on screen width)
const baseColumnProportions = {
  symbol: 120,
  company: 200,
  chgPercent: 100,
  chg: 100,
  technicalRating1: 160,
  technicalRating2: 160,
  volume: 100,
  volumePrice: 120,
  mktCap: 100,
  pe: 80,
  eps: 100,
  sector: 200,
}

// Calculate total base width
const baseTotalWidth = Object.values(baseColumnProportions).reduce((sum, width) => sum + width, 0)

// Function to calculate dynamic table width based on screen size
const getTableWidth = (screenWidth: number): number => {
  return screenWidth // Table width = full screen width
}

// Function to calculate scaled column widths
const getScaledColumnWidths = (screenWidth: number, visibleColumns: Record<string, boolean>) => {
  const targetTableWidth = getTableWidth(screenWidth)

  // Calculate total proportion for visible columns only
  const visibleProportions = Object.entries(baseColumnProportions)
    .filter(([key]) => visibleColumns[key])
    .reduce((sum, [, proportion]) => sum + proportion, 0)

  // Scale factor to reach target width
  const scaleFactor = targetTableWidth / visibleProportions

  // Calculate scaled widths
  const scaledWidths: Record<string, string> = {}
  Object.entries(baseColumnProportions).forEach(([key, proportion]) => {
    if (visibleColumns[key]) {
      scaledWidths[key] = `${Math.round(proportion * scaleFactor)}px`
    }
  })

  return scaledWidths
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const generateMoreData = (existingData: StockData[], batchSize = 20): StockData[] => {
  const newData: StockData[] = []
  const baseDataLength = stockData.length

  for (let i = 0; i < batchSize; i++) {
    const sourceIndex = i % baseDataLength
    const sourceItem = stockData[sourceIndex]
    const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
    const newItem: StockData = {
      ...sourceItem,
      id: existingData.length + i,
      chg: sourceItem.chg * (1 + variation),
      chgPercent: sourceItem.chgPercent * (1 + variation),
      volume: `${(Number.parseFloat(sourceItem.volume.replace(" M", "")) * (1 + variation)).toFixed(2)} M`,
      pe: (Number.parseFloat(sourceItem.pe) * (1 + variation)).toFixed(2),
    }

    newData.push(newItem)
  }

  return newData
}

export default function VirtualizedTable() {
  const [data, setData] = useState<StockData[]>([])
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [filterPosition, setFilterPosition] = useState<{ top: number; left: number } | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [isScrolling, setIsScrolling] = useState(false)
  const [screenWidth, setScreenWidth] = useState(1920)
  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const headerTableRef = useRef<HTMLTableElement>(null)
  const bodyTableRef = useRef<HTMLTableElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollTopRef = useRef(0)
  const router = useRouter()

  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(Object.keys(baseColumnProportions).map((key) => [key, true])),
  )

  // Track screen width and update visible columns
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      setScreenWidth(width)

      if (width < 640) {
        setVisibleColumns({
          symbol: true,
          company: true,
          chgPercent: true,
          chg: true,
          technicalRating1: false,
          technicalRating2: false,
          volume: false,
          volumePrice: false,
          mktCap: false,
          pe: false,
          eps: false,
          sector: false,
        })
      } else if (width < 1024) {
        setVisibleColumns({
          symbol: true,
          company: true,
          chgPercent: true,
          chg: true,
          technicalRating1: true,
          technicalRating2: false,
          volume: true,
          volumePrice: false,
          mktCap: true,
          pe: false,
          eps: true,
          sector: true,
        })
      } else {
        setVisibleColumns(Object.fromEntries(Object.keys(baseColumnProportions).map((key) => [key, true])))
      }
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  // Calculate dynamic column widths based on screen size
  const columnWidths = useMemo(() => {
    return getScaledColumnWidths(screenWidth, visibleColumns)
  }, [screenWidth, visibleColumns])

  // Calculate total table width
  const totalTableWidth = useMemo(() => {
    return getTableWidth(screenWidth)
  }, [screenWidth])

  // Initial data load
  useEffect(() => {
    const initialData = stockData.slice(0, 20).map((item, index) => ({ ...item, id: index }))
    setData(initialData)
  }, [])

  // Synchronize header and body table widths
  useEffect(() => {
    if (headerTableRef.current && bodyTableRef.current) {
      const syncColumnWidths = () => {
        const headerCols = headerTableRef.current?.querySelectorAll("th")
        const bodyCols = bodyTableRef.current?.querySelectorAll("tr:first-child td")

        if (headerCols && bodyCols && headerCols.length === bodyCols.length) {
          for (let i = 0; i < headerCols.length; i++) {
            const width = headerCols[i].offsetWidth
            // Cast to HTMLElement to access style property
            const bodyCol = bodyCols[i] as HTMLElement
            bodyCol.style.width = `${width}px`
            bodyCol.style.minWidth = `${width}px`
            bodyCol.style.maxWidth = `${width}px`
          }
        }
      }

      // Run after a short delay to ensure DOM is ready
      setTimeout(syncColumnWidths, 100)

      // Also sync on resize
      window.addEventListener("resize", syncColumnWidths)
      return () => window.removeEventListener("resize", syncColumnWidths)
    }
  }, [visibleColumns, data.length > 0, columnWidths])

  // Dynamic item height based on screen size
  const itemHeight = useMemo(() => {
    if (screenWidth >= 4000) return 60 // Larger rows for ultra-wide screens
    if (screenWidth >= 3840) return 56 // Large rows for 4K screens
    if (screenWidth >= 2560) return 52 // Medium-large rows for 2K screens
    return 48 // Standard row height
  }, [screenWidth])

  const { virtualItems, totalHeight } = useVirtualizedTable({
    itemCount: data.length,
    itemHeight,
    overscan: screenWidth >= 3840 ? 15 : 10,
    containerRef,
  })

  const loadMoreData = useCallback(async () => {
    if (loading) return
    const currentScrollTop = containerRef.current?.scrollTop || 0
    lastScrollTopRef.current = currentScrollTop

    setLoading(true)

    try {
      // Dynamic batch size based on screen size
      const batchSize = screenWidth >= 4000 ? 35 : screenWidth >= 3840 ? 30 : screenWidth >= 2560 ? 25 : 20
      await delay(600)
      const moreData = generateMoreData(data, batchSize)

      setData((prevData) => [...prevData, ...moreData])
      setPage((prevPage) => prevPage + 1)

      await new Promise((resolve) => setTimeout(resolve, 30))
      if (containerRef.current) {
        containerRef.current.scrollTop = lastScrollTopRef.current
      }
    } catch (error) {
      console.error("Error loading more data:", error)
    } finally {
      setLoading(false)
    }
  }, [data, loading, page, screenWidth])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading) return

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 100)

      // Dynamic threshold based on screen size
      const threshold = screenWidth >= 4000 ? 400 : screenWidth >= 3840 ? 300 : 200
      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        loadMoreData()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        container.removeEventListener("scroll", handleScroll)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    }
  }, [loadMoreData, loading, screenWidth])

  const handleFilterClick = (column: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeFilter === column) {
      setActiveFilter(null)
      setFilterPosition(undefined)
      return
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setFilterPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX })
    setActiveFilter(column)
  }

  const renderFilterIcon = (column: string) => {
    const iconSize = screenWidth >= 4000 ? 22 : screenWidth >= 3840 ? 20 : screenWidth >= 2560 ? 18 : 16
    return (
      <div
        className="flex items-center justify-center ml-1 cursor-pointer transition-opacity hover:opacity-100"
        style={{ width: `${iconSize + 4}px`, height: `${iconSize + 4}px` }}
        onClick={(e) => handleFilterClick(column, e)}
      >
        <Image
          src="/filter.svg"
          alt="filter"
          width={iconSize}
          height={iconSize}
          className={`opacity-70 ${activeFilter === column ? "opacity-100" : ""}`}
        />
      </div>
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setActiveFilter(null)
        setFilterPosition(undefined)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getRatingClass = (rating: string) => {
    if (rating.includes("Buy")) return "text-[#26a0da] flex items-center"
    if (rating.includes("Sell")) return "text-[#ff5252] flex items-center"
    return "text-gray-500 flex items-center"
  }

  const getValueClass = (value: number) => {
    if (value > 0) return "text-[#1eb980]"
    if (value < 0) return "text-[#ff5252]"
    return "text-gray-400"
  }

  const renderCellContent = useCallback(
    (row: StockData, key: string) => {
      const value = row[key as keyof StockData]
      const fontSize =
        screenWidth >= 4000
          ? "text-lg"
          : screenWidth >= 3840
            ? "text-base"
            : screenWidth >= 2560
              ? "text-sm"
              : "text-sm"
      const iconSize = screenWidth >= 4000 ? 28 : screenWidth >= 3840 ? 24 : screenWidth >= 2560 ? 22 : 20

      if (key === "symbol") {
        return (
          <div className="flex items-center justify-center">
            <Image src="/nvidia 1.png" alt="n" width={iconSize} height={iconSize} className="flex-shrink-0" />
            <span className={`font-medium ${fontSize} text-white pl-2 truncate`}>{value}</span>
          </div>
        )
      }

      if (key === "technicalRating1" || key === "technicalRating2") {
        const stringValue = String(value)
        const chevronSize = screenWidth >= 4000 ? 22 : screenWidth >= 3840 ? 20 : screenWidth >= 2560 ? 18 : 16
        return (
          <div className={`${getRatingClass(stringValue)} justify-center`}>
            {stringValue.includes("Buy") && (
              <ChevronUp className={`mr-1 flex-shrink-0`} style={{ width: chevronSize, height: chevronSize }} />
            )}
            {stringValue.includes("Sell") && (
              <ChevronDown className={`mr-1 flex-shrink-0`} style={{ width: chevronSize, height: chevronSize }} />
            )}
            <span className={`truncate ${fontSize}`}>{stringValue}</span>
          </div>
        )
      }

      if (key === "chg" || key === "chgPercent") {
        return (
          <span className={`${getValueClass(value as number)} ${fontSize} text-center block truncate font-medium`}>
            {key === "chg" ? `${(value as number).toFixed(2)}$` : `${(value as number).toFixed(2)}%`}
          </span>
        )
      }

      return (
        <span className={`${fontSize} text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis text-center block`}>
          {value}
        </span>
      )
    },
    [screenWidth],
  )

  // Memoize visible columns for performance
  const visibleColumnKeys = useMemo(
    () => Object.keys(baseColumnProportions).filter((key) => visibleColumns[key]),
    [visibleColumns],
  )

  // Dynamic container height based on screen size
  const containerHeight = useMemo(() => {
    if (screenWidth >= 4000) return "650px" // Taller for ultra-wide screens
    if (screenWidth >= 3840) return "600px" // Taller for 4K screens
    if (screenWidth >= 2560) return "540px" // Medium height for 2K screens
    return "480px" // Standard height
  }, [screenWidth])

  // Dynamic header height and padding
  const headerHeight =
    screenWidth >= 4000 ? "h-18" : screenWidth >= 3840 ? "h-16" : screenWidth >= 2560 ? "h-14" : "h-12"
  const headerPadding =
    screenWidth >= 4000 ? "p-5 px-8" : screenWidth >= 3840 ? "p-4 px-6" : screenWidth >= 2560 ? "p-3 px-5" : "p-2 px-4"
  const cellPadding =
    screenWidth >= 4000
      ? "py-5 px-8"
      : screenWidth >= 3840
        ? "py-4 px-6"
        : screenWidth >= 2560
          ? "py-3.5 px-5"
          : "py-3 px-4"

  return (
    <div
      className="w-full hide-scrollbar mx-auto"
      style={{ width: `${totalTableWidth}px`, maxWidth: `${totalTableWidth}px` }}
    >
      <div ref={tableRef} className="bg-[#0a1929] border border-[#1e3a5f] rounded-none hide-scrollbar">
        {/* Enhanced header with responsive sizing */}
        <div
          className={`bg-[#0f2132] ${headerPadding} flex justify-between items-center border-b border-[#1e3a5f] ${headerHeight}`}
          style={{ width: `${totalTableWidth}px`, minWidth: `${totalTableWidth}px` }}
        >
          <span
            className={`${screenWidth >= 4000 ? "text-lg" : screenWidth >= 3840 ? "text-base" : "text-sm"} text-[#26dbd6] font-medium`}
          >
            {data.length} matches
          </span>
          <div className="flex items-center gap-3 min-w-[140px] justify-end">
            {loading && (
              <div className="flex items-center gap-2 text-[#26dbd6]">
                <Loader2
                  className={`${screenWidth >= 4000 ? "h-5 w-5" : screenWidth >= 3840 ? "h-4 w-4" : "h-3 w-3"} animate-spin`}
                />
                <span
                  className={`${screenWidth >= 4000 ? "text-base" : screenWidth >= 3840 ? "text-sm" : "text-xs"} whitespace-nowrap`}
                >
                  Loading...
                </span>
              </div>
            )}
            <span
              className={`${screenWidth >= 4000 ? "text-base" : screenWidth >= 3840 ? "text-sm" : "text-xs"} text-gray-400 whitespace-nowrap`}
            >
              Page {page}
            </span>
          </div>
        </div>

        {/* Enhanced container with responsive height */}
        <div className="relative">
          <div
            className="overflow-y-auto hide-scrollbar"
            ref={containerRef}
            style={{ height: containerHeight, width: `${totalTableWidth}px`, minWidth: `${totalTableWidth}px` }}
          >
            {/* Sticky header with scaled widths */}
            <div className="sticky top-0 z-20 bg-[#000B13] border-b border-[#1e3a5f] shadow-sm">
              <table
                ref={headerTableRef}
                className="w-full border-collapse table-fixed"
                style={{ width: `${totalTableWidth}px`, minWidth: `${totalTableWidth}px` }}
              >
                <thead>
                  <tr>
                    {visibleColumnKeys.map((col) => (
                      <th
                        key={col}
                        className={`${cellPadding} text-[#26dbd6] font-semibold ${screenWidth >= 4000 ? "text-base" : screenWidth >= 3840 ? "text-sm" : "text-xs"} uppercase border-r border-[#1e3a5f] bg-[#000B13]`}
                        style={{
                          width: columnWidths[col],
                          minWidth: columnWidths[col],
                          maxWidth: columnWidths[col],
                          textAlign: "center",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{col.replace(/([A-Z])/g, " $1").toUpperCase()}</span>
                          {["company", "chg", "volumePrice", "sector"].includes(col) ? renderFilterIcon(col) : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>

            {/* Virtual rows with scaled widths */}
            <div
              className="relative"
              style={{
                height: `${totalHeight}px`,
                minHeight: `${totalHeight}px`,
                width: `${totalTableWidth}px`,
                minWidth: `${totalTableWidth}px`,
              }}
            >
              <table
                ref={bodyTableRef}
                className="w-full border-collapse table-fixed absolute top-0 left-0"
                style={{ width: `${totalTableWidth}px`, minWidth: `${totalTableWidth}px` }}
              >
                <tbody>
                  {virtualItems.map((virtualRow) => {
                    const row = data[virtualRow.index]
                    if (!row) return null

                    return (
                      <tr
                        key={`${row.id}-${virtualRow.index}`}
                        className="border-b border-[#1e3a5f] hover:bg-[#1e3a5f] cursor-pointer transition-colors duration-150 absolute w-full"
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                          width: `${totalTableWidth}px`,
                        }}
                        onClick={() => router.push("/wallet-details")}
                      >
                        {visibleColumnKeys.map((key) => (
                          <td
                            key={key}
                            className={`${cellPadding} border-r border-[#1e3a5f]`}
                            style={{
                              width: columnWidths[key],
                              minWidth: columnWidths[key],
                              maxWidth: columnWidths[key],
                              textAlign: "center",
                            }}
                          >
                            {renderCellContent(row, key)}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Enhanced loading indicator */}
            {loading && (
              <div
                className="sticky bottom-0 left-0 right-0 bg-[#0a1929] border-t border-[#1e3a5f] z-10"
                style={{ width: `${totalTableWidth}px`, minWidth: `${totalTableWidth}px` }}
              >
                <div
                  className={`flex items-center justify-center ${screenWidth >= 4000 ? "py-8" : screenWidth >= 3840 ? "py-6" : "py-4"}`}
                >
                  <div className="flex items-center gap-3 text-[#26dbd6]">
                    <Loader2
                      className={`${screenWidth >= 4000 ? "h-7 w-7" : screenWidth >= 3840 ? "h-6 w-6" : "h-5 w-5"} animate-spin`}
                    />
                    <span
                      className={`${screenWidth >= 4000 ? "text-lg" : screenWidth >= 3840 ? "text-base" : "text-sm"} font-medium`}
                    >
                      Loading more data...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {activeFilter && (
          <FilterDropdown
            column={activeFilter}
            position={filterPosition}
            onClose={() => {
              setActiveFilter(null)
              setFilterPosition(undefined)
            }}
          />
        )}
      </div>
    </div>
  )
}
