"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { stockData, type StockData } from "../data/stockData"
import Image from "next/image"
import FilterDropdown from "../components/FilterDropdown"
import { useVirtualizedTable } from "../hooks/useVirtualizedTable"
import { useRouter } from "next/navigation"

const columnWidths = {
  symbol: "120px",
  company: "200px",
  chgPercent: "100px",
  chg: "100px",
  technicalRating1: "160px",
  technicalRating2: "160px",
  volume: "100px",
  volumePrice: "120px",
  mktCap: "100px",
  pe: "80px",
  eps: "100px",
  sector: "200px",
}

// Delay function to simulate API call
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// Function to generate more data by duplicating and modifying existing data
const generateMoreData = (existingData: StockData[], batchSize = 20): StockData[] => {
  const newData: StockData[] = []
  const baseDataLength = stockData.length

  for (let i = 0; i < batchSize; i++) {
    const sourceIndex = i % baseDataLength
    const sourceItem = stockData[sourceIndex]

    // Create variations in the data to make it look more realistic
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
  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollTopRef = useRef(0)
  const router = useRouter()

  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(Object.keys(columnWidths).map((key) => [key, true])),
  )

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
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
        setVisibleColumns(Object.fromEntries(Object.keys(columnWidths).map((key) => [key, true])))
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Initial data load
  useEffect(() => {
    const initialData = stockData.slice(0, 20).map((item, index) => ({ ...item, id: index }))
    setData(initialData)
  }, [])

  // Memoize virtual items to prevent unnecessary recalculations
  const { virtualItems, totalHeight } = useVirtualizedTable({
    itemCount: data.length,
    itemHeight: 48,
    overscan: 10, // Increased overscan for smoother scrolling
    containerRef,
  })

  // Function to load more data with improved scroll position preservation
  const loadMoreData = useCallback(async () => {
    if (loading) return // Remove hasMore check

    // Store current scroll position
    const currentScrollTop = containerRef.current?.scrollTop || 0
    lastScrollTopRef.current = currentScrollTop

    // 1. Set loading state to true
    setLoading(true)

    try {
      // 2. Call delay to simulate API call
      await delay(800) // Reduced delay for better UX

      // 3. Generate more data
      const moreData = generateMoreData(data, 20)

      // 4. Spread the state twice (append new data)
      setData((prevData) => {
        const newData = [...prevData, ...moreData]
        return newData
      })

      setPage((prevPage) => prevPage + 1)

      // Remove the hasMore limit logic - infinite scrolling

      // Small delay to ensure DOM updates before scroll adjustment
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Maintain scroll position to prevent jumping
      if (containerRef.current) {
        containerRef.current.scrollTop = lastScrollTopRef.current
      }
    } catch (error) {
      console.error("Error loading more data:", error)
    } finally {
      // 5. Set loading state to false
      setLoading(false)
    }
  }, [data, loading, page]) // Remove hasMore from dependencies

  // Improved scroll event handler with throttling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading) return // Remove hasMore check

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current

      // Set scrolling state for performance optimization
      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      // Check if user has scrolled to within 200px of the bottom
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMoreData()
      }
    }

    const container = containerRef.current
    if (container) {
      // Use passive listener for better performance
      container.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        container.removeEventListener("scroll", handleScroll)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    }
  }, [loadMoreData, loading]) // Remove hasMore from dependencies

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

  const renderFilterIcon = (column: string) => (
    <div
      className="w-6 h-6 flex items-center justify-center ml-1 cursor-pointer"
      onClick={(e) => handleFilterClick(column, e)}
    >
      <Image
        src="/filter.svg"
        alt="filter"
        width={16}
        height={16}
        className={`opacity-70 ${activeFilter === column ? "opacity-100" : ""}`}
      />
    </div>
  )

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

  const renderCellContent = useCallback((row: StockData, key: string) => {
    const value = row[key as keyof StockData]
    if (key === "symbol") {
      return (
        <div className="flex items-center">
          <Image src="/nvidia 1.png" alt="n" width={20} height={20} className="flex-shrink-0" />
          <span className="font-medium text-sm text-white pl-2 truncate">{value}</span>
        </div>
      )
    }
    if (key === "technicalRating1" || key === "technicalRating2") {
      const stringValue = String(value)
      return (
        <div className={getRatingClass(stringValue)}>
          {stringValue.includes("Buy") && <ChevronUp className="h-4 w-4 mr-1 flex-shrink-0" />}
          {stringValue.includes("Sell") && <ChevronDown className="h-4 w-4 mr-1 flex-shrink-0" />}
          <span className="truncate">{stringValue}</span>
        </div>
      )
    }

    if (key === "chg" || key === "chgPercent") {
      return (
        <span className={`${getValueClass(value as number)} text-sm text-right block truncate`}>
          {key === "chg" ? `${(value as number).toFixed(2)}$` : `${(value as number).toFixed(2)}%`}
        </span>
      )
    }
    return (
      <span className="text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis text-right block">
        {value}
      </span>
    )
  }, [])

  // Memoize visible columns for performance
  const visibleColumnKeys = useMemo(
    () => Object.keys(columnWidths).filter((key) => visibleColumns[key]),
    [visibleColumns],
  )

  return (
    <div className="w-full overflow-x-auto max-w-[4000px] mx-auto">
      <div ref={tableRef} className="bg-[#0a1929] border border-[#1e3a5f] rounded-none overflow-x-auto">
        {/* Fixed header with stable height */}
        <div className="bg-[#0f2132] p-2 px-4 flex justify-between items-center border-b border-[#1e3a5f] min-w-max h-12">
          <span className="text-sm text-[#26dbd6]">{data.length} matches</span>
          <div className="flex items-center gap-2 min-w-[120px] justify-end">
            {loading && (
              <div className="flex items-center gap-2 text-[#26dbd6]">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="text-xs whitespace-nowrap">Loading...</span>
              </div>
            )}
            <span className="text-xs text-gray-400 whitespace-nowrap">Page {page}</span>
          </div>
        </div>

        {/* Stable container with fixed height */}
        <div className="relative">
          <div className="h-[480px] overflow-y-auto overflow-x-hidden" ref={containerRef}>
            {/* Virtual table with stable positioning */}
            <div
              className="relative"
              style={{
                height: `${totalHeight}px`,
                minHeight: `${totalHeight}px`,
              }}
            >
              {/* Sticky header */}
              <div className="sticky top-0 z-20 bg-[#000B13] border-b border-[#1e3a5f]">
                <table className="table-fixed w-full border-collapse">
                  <thead>
                    <tr>
                      {visibleColumnKeys.map((col) => (
                        <th
                          key={col}
                          className="py-3 px-4 text-[#26dbd6] font-medium text-sm uppercase border-r border-[#1e3a5f] bg-[#000B13]"
                          style={{
                            width: columnWidths[col as keyof typeof columnWidths],
                            minWidth: columnWidths[col as keyof typeof columnWidths],
                            maxWidth: columnWidths[col as keyof typeof columnWidths],
                            textAlign:
                              col === "company" || col === "sector" || col.includes("Rating") ? "left" : "right",
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

              {/* Virtual rows */}
              <div className="relative">
                <table className="table-fixed w-full border-collapse">
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
                          }}
                          onClick={() => router.push("/wallet-details")}
                        >
                          {visibleColumnKeys.map((key) => (
                            <td
                              key={key}
                              className="py-3 px-4 border-r border-[#1e3a5f]"
                              style={{
                                width: columnWidths[key as keyof typeof columnWidths],
                                minWidth: columnWidths[key as keyof typeof columnWidths],
                                maxWidth: columnWidths[key as keyof typeof columnWidths],
                                textAlign:
                                  key === "company" || key === "sector" || key.includes("Rating") ? "left" : "right",
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
            </div>

            {/* Fixed position loading indicator */}
            {loading && (
              <div className="sticky bottom-0 left-0 right-0 bg-[#0a1929] border-t border-[#1e3a5f] z-10">
                <div className="flex items-center justify-center py-4">
                  <div className="flex items-center gap-3 text-[#26dbd6]">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">Loading more data...</span>
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
