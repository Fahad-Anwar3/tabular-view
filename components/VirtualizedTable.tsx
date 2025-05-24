"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
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

export default function VirtualizedTable() {
  const [data, setData] = useState<StockData[]>([])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [filterPosition, setFilterPosition] = useState<{ top: number; left: number } | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(Object.keys(columnWidths).map((key) => [key, true]))
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

  useEffect(() => {
    const expandedData = stockData.slice(0, 100).map((item, index) => ({ ...item, id: index }))
    setData(expandedData)
  }, [])

  const { virtualItems, totalHeight } = useVirtualizedTable({
    itemCount: data.length,
    itemHeight: 48,
    overscan: 5,
    containerRef,
  })

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

  const renderCellContent = (row: StockData, key: string) => {
    const value = row[key as keyof StockData]
    if (key === "symbol") {
      return (
        <div className="flex items-center">
          <Image src="/nvidia 1.png" alt="n" width={20} height={20} />
          <span className="font-medium text-sm text-white pl-2">{value}</span>
        </div>
      )
    }
   if (key === "technicalRating1" || key === "technicalRating2") {
  const stringValue = String(value);
  return (
    <div className={getRatingClass(stringValue)}>
      {stringValue.includes("Buy") && <ChevronUp className="h-4 w-4 mr-1" />}
      {stringValue.includes("Sell") && <ChevronDown className="h-4 w-4 mr-1" />}
      <span>{stringValue}</span>
    </div>
  )
}

    if (key === "chg" || key === "chgPercent") {
      return (
        <span className={`${getValueClass(value as number)} text-sm text-right`}>
          {key === "chg" ? `${(value as number).toFixed(2)}$` : `${(value as number).toFixed(2)}%`}
        </span>
      )
    }
    return (
      <span className="text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis text-right block">
        {value}
      </span>
    )
  }

  return (
    <div className="w-full overflow-x-auto max-w-[4000px] mx-auto">
      <div ref={tableRef} className="bg-[#0a1929] border border-[#1e3a5f] rounded-none overflow-x-auto">
        <div className="bg-[#0f2132] p-2 px-4 flex justify-between items-center border-b border-[#1e3a5f] min-w-max">
          <span className="text-sm text-[#26dbd6]">{data.length} matches</span>
        </div>

        <div className="h-[480px] overflow-y-auto" ref={containerRef}>
          <table className="table-fixed w-full border-collapse">
            <thead className="bg-[#000B13] sticky top-0 z-10">
              <tr>
                {Object.keys(columnWidths).map(
                  (col) =>
                    visibleColumns[col] && (
                      <th
                        key={col}
                        className="py-3 px-4 text-[#26dbd6] font-medium text-sm uppercase border-b border-r border-[#1e3a5f] bg-[#000B13]"
                        style={{
                          width: columnWidths[col as keyof typeof columnWidths],
                          minWidth: columnWidths[col as keyof typeof columnWidths],
                          maxWidth: columnWidths[col as keyof typeof columnWidths],
                          textAlign:
                            col === "company" || col === "sector" || col.includes("Rating") ? "left" : "right",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{col.replace(/([A-Z])/g, " $1").toUpperCase()}</span>
                          {["company", "chg", "volumePrice", "sector"].includes(col) ? renderFilterIcon(col) : null}
                        </div>
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {virtualItems.map((virtualRow) => {
                const row = data[virtualRow.index]
                return (
                  <tr
                    key={row.id}
                    className="border-b border-[#1e3a5f] hover:bg-[#1e3a5f] cursor-pointer"
                    style={{ height: `${virtualRow.size}px` }}
                    onClick={() => router.push("/wallet-details")}
                  >
                    {Object.keys(columnWidths).map(
                      (key) =>
                        visibleColumns[key] && (
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
                        )
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
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
