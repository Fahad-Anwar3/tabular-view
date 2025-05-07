"use client"

import type React from "react"

import { useEffect, useState, useRef, memo } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { stockData } from "../data/stockData"
import Image from "next/image"
import FilterDropdown from "./FilterDropdown"
import { useVirtualizedTable } from "../hooks/useVirtualizedTable"

type StockData = {
  id: number
  symbol: string
  company: string
  chg: number
  chgPercent: number
  technicalRating1: string
  technicalRating2: string
  volume: string
  volumePrice: string
  mktCap: string
  pe: string
  eps: string
  sector: string
}

// Memoized row component for better performance
const VirtualRow = memo(({ row, style }: { row: StockData; style: React.CSSProperties }) => {
  const renderRatingIcon = (rating: string) => {
    if (rating.includes("Buy")) {
      return <ChevronUp className="h-4 w-4 mr-1" />
    } else if (rating.includes("Sell")) {
      return <ChevronDown className="h-4 w-4 mr-1" />
    } else {
      return <span className="h-4 w-4 mr-1 inline-block">—</span>
    }
  }

  const getRatingClass = (rating: string) => {
    if (rating === "Strong Buy") return "text-[#1eb980] flex items-center"
    if (rating === "Buy") return "text-[#4caf50] flex items-center"
    if (rating === "Strong Sell") return "text-[#ff5252] flex items-center"
    if (rating === "Sell") return "text-[#f44336] flex items-center"
    return "text-gray-400 flex items-center"
  }

  const getValueClass = (value: number) => {
    if (value > 0) return "text-[#1eb980]"
    if (value < 0) return "text-[#ff5252]"
    return "text-gray-400"
  }

  return (
    <tr className="border-b border-[#1e3a5f] hover:bg-[#1e3a5f] absolute w-full" style={style}>
      <td className="py-3 px-2 md:px-4">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-[#76b900] rounded-sm mr-2 flex items-center justify-center">
            <span className="text-xs text-white">N</span>
          </div>
          <span className="font-medium text-sm md:text-base">NVDA</span>
        </div>
      </td>
      <td className="py-3 px-2 md:px-4 text-gray-300 text-sm md:text-base">NVIDIA CORPORATION</td>
      <td className={`py-3 px-2 md:px-4 ${getValueClass(row.chgPercent)} text-sm md:text-base`}>
        <div className="flex items-center">
          {row.chgPercent > 0 ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              {row.chgPercent.toFixed(2)}%
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              {Math.abs(row.chgPercent).toFixed(2)}%
            </>
          )}
        </div>
      </td>
      <td className={`py-3 px-2 md:px-4 ${getValueClass(row.chg)} text-sm md:text-base`}>
        <div className="flex items-center">
          {row.chg > 0 ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              {row.chg.toFixed(2)}$
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              {Math.abs(row.chg).toFixed(2)}$
            </>
          )}
        </div>
      </td>
      <td className="py-3 px-2 md:px-4 text-sm md:text-base">
        <div className={getRatingClass(row.technicalRating1)}>
          {renderRatingIcon(row.technicalRating1)}
          {row.technicalRating1}
        </div>
      </td>
      <td className="py-3 px-2 md:px-4 text-sm md:text-base">
        <div className={getRatingClass(row.technicalRating2)}>
          {renderRatingIcon(row.technicalRating2)}
          {row.technicalRating2}
        </div>
      </td>
      <td className="py-3 px-2 md:px-4 text-sm md:text-base">{row.volume}</td>
      <td className="py-3 px-2 md:px-4 text-sm md:text-base">{row.volumePrice}</td>
      <td className="py-3 px-2 md:px-4 text-sm md:text-base">{row.mktCap}</td>
      <td className="py-3 px-2 md:px-4 text-sm md:text-base">{row.pe}</td>
      <td className="py-3 px-2 md:px-4 text-sm md:text-base">{row.eps}</td>
      <td className="py-3 px-2 md:px-4 text-sm md:text-base">
        <div className="flex items-center">
          <span>Consumer Non-Durables</span>
        </div>
      </td>
    </tr>
  )
})
VirtualRow.displayName = "VirtualRow"

export default function VirtualizedTable() {
  const [data, setData] = useState<StockData[]>([])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  // Fix: Change the type to HTMLTableSectionElement
  const containerRef = useRef<HTMLTableSectionElement>(null)
  const [visibleColumns, setVisibleColumns] = useState({
    symbol: true,
    company: true,
    chgPercent: true,
    chg: true,
    technicalRating1: true,
    technicalRating2: true,
    volume: true,
    volumePrice: true,
    mktCap: true,
    pe: true,
    eps: true,
    sector: true,
  })

  // Adjust visible columns based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        // Small screens
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
        // Medium screens
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
          eps: false,
          sector: true,
        })
      } else {
        // Large screens
        setVisibleColumns({
          symbol: true,
          company: true,
          chgPercent: true,
          chg: true,
          technicalRating1: true,
          technicalRating2: true,
          volume: true,
          volumePrice: true,
          mktCap: true,
          pe: true,
          eps: true,
          sector: true,
        })
      }
    }

    handleResize() // Initial call
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Load data
  useEffect(() => {
    // Create a larger dataset for virtualization demo
    const expandedData = Array(100)
      .fill(0)
      .flatMap((_, i) =>
        stockData.map((item) => ({
          ...item,
          id: i * stockData.length + item.id,
        })),
      )
    setData(expandedData)

    // Add click outside listener to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveFilter(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const { virtualItems, totalHeight } = useVirtualizedTable({
    itemCount: data.length,
    itemHeight: 56, // Height of each row in pixels
    overscan: 5,
    containerRef,
  })

  const handleFilterClick = (column: string) => {
    setActiveFilter(activeFilter === column ? null : column)
  }

  const renderFilterIcon = (column: string) => {
    return (
      <div
        className="w-5 h-5 flex items-center justify-center ml-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          handleFilterClick(column)
        }}
      >
        <Image
          src="/filter.svg"
          alt="filter"
          width={20}
          height={20}
          className={`opacity-70 ${activeFilter === column ? "opacity-100" : ""}`}
        />
        {activeFilter === column && (
          <div ref={filterRef}>
            <FilterDropdown column={column} onClose={() => setActiveFilter(null)} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-[#0a1929] border border-[#1e3a5f] rounded-none overflow-hidden">
      <div className="bg-[#0f2132] p-2 flex justify-between items-center">
        <span className="text-sm text-gray-300">{data.length} matches</span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0f2132] border-b border-[#1e3a5f]">
              {visibleColumns.symbol && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[120px]">
                  <div className="flex items-center justify-between relative">
                    Symbol
                    {renderFilterIcon("symbol")}
                  </div>
                </th>
              )}
              {visibleColumns.company && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px] md:w-[180px]">
                  <div className="flex items-center justify-between relative">
                    Company
                    {renderFilterIcon("company")}
                  </div>
                </th>
              )}
              {visibleColumns.chgPercent && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between relative">
                    CHG %{renderFilterIcon("chgPercent")}
                  </div>
                </th>
              )}
              {visibleColumns.chg && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between relative">
                    CHG
                    {renderFilterIcon("chg")}
                  </div>
                </th>
              )}
              {visibleColumns.technicalRating1 && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px] md:w-[160px]">
                  <div className="flex items-center justify-between relative">
                    Technical Rating
                    {renderFilterIcon("technicalRating1")}
                  </div>
                </th>
              )}
              {visibleColumns.technicalRating2 && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px] md:w-[160px]">
                  <div className="flex items-center justify-between relative">
                    Technical Rating
                    {renderFilterIcon("technicalRating2")}
                  </div>
                </th>
              )}
              {visibleColumns.volume && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between relative">
                    VOL
                    {renderFilterIcon("volume")}
                  </div>
                </th>
              )}
              {visibleColumns.volumePrice && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px] md:w-[120px]">
                  <div className="flex items-center justify-between relative">
                    Volume/Price
                    {renderFilterIcon("volumePrice")}
                  </div>
                </th>
              )}
              {visibleColumns.mktCap && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between relative">
                    MKT CAP
                    {renderFilterIcon("mktCap")}
                  </div>
                </th>
              )}
              {visibleColumns.pe && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[60px] md:w-[80px]">
                  <div className="flex items-center justify-between relative">
                    P/E
                    {renderFilterIcon("pe")}
                  </div>
                </th>
              )}
              {visibleColumns.eps && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between relative">
                    EPS (TTM)
                    {renderFilterIcon("eps")}
                  </div>
                </th>
              )}
              {visibleColumns.sector && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px] md:w-[180px]">
                  <div className="flex items-center justify-between">SECTOR</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody ref={containerRef} style={{ height: `${totalHeight}px`, position: "relative" }}>
            {virtualItems.map((virtualRow) => {
              const row = data[virtualRow.index]
              return (
                <VirtualRow
                  key={row.id}
                  row={row}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
