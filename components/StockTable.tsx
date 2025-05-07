"use client"

import type React from "react"

import { useEffect, useState, useRef, memo } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { stockData } from "../data/stockData"
import Image from "next/image"
import FilterDropdown from "./FilterDropdown"

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

// Memoized table row component for better performance
const TableRow = memo(({ row, index }: { row: StockData; index: number }) => {
  const getValueClass = (value: number) => {
    if (value > 0) return "text-[#1eb980]"
    if (value < 0) return "text-[#ff5252]"
    return "text-gray-400"
  }

  const getRatingClass = (rating: string) => {
    if (rating === "Strong Buy") return "text-[#1eb980] flex items-center"
    if (rating === "Buy") return "text-[#4caf50] flex items-center"
    if (rating === "Strong Sell") return "text-[#ff5252] flex items-center"
    if (rating === "Sell") return "text-[#f44336] flex items-center"
    return "text-gray-400 flex items-center"
  }

  const renderRatingIcon = (rating: string) => {
    if (rating.includes("Buy")) {
      return <ChevronUp className="h-4 w-4 mr-1" />
    } else if (rating.includes("Sell")) {
      return <ChevronDown className="h-4 w-4 mr-1" />
    } else {
      return <span className="h-4 w-4 mr-1 inline-block">—</span>
    }
  }

  return (
    <tr className={`border-b border-[#1e3a5f] ${index % 2 === 1 ? "bg-[#0c1e33]" : "bg-[#0a1929]"} hover:bg-[#1e3a5f]`}>
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
TableRow.displayName = "TableRow"

export default function StockTable() {
  const [data, setData] = useState<StockData[]>([])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 })
  const tableRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    setData(stockData)

    // Add click outside listener to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (activeFilter && tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setActiveFilter(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeFilter])

  const handleFilterClick = (e: React.MouseEvent, column: string) => {
    e.stopPropagation()

    // Get position for the dropdown
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    setFilterPosition({
      top: rect.bottom + scrollTop,
      left: rect.left,
    })

    // Toggle the active filter
    setActiveFilter(activeFilter === column ? null : column)
  }

  return (
    <div className="bg-[#000B13] border border-[#1e3a5f] rounded-none overflow-hidden relative" ref={tableRef}>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#000B13] border-b border-[#1e3a5f]">
              {visibleColumns.symbol && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[120px]">
                  <div className="flex">
                    <p>Symbol</p>
                  </div>
                </th>
              )}
              {visibleColumns.company && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px] md:w-[180px]">
                  <div className="flex items-center justify-between">
                    Company
                    <div
                      className="w-6 h-6 flex items-center justify-center ml-2 cursor-pointer"
                      onClick={(e) => handleFilterClick(e, "company")}
                    >
                      <Image src="/filter.svg" alt="filter" width={24} height={24} className="opacity-70" />
                    </div>
                  </div>
                </th>
              )}
              {visibleColumns.chgPercent && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between">
                    CHG%
                    <div
                      className="w-6 h-6 flex items-center justify-center ml-2 cursor-pointer"
                      onClick={(e) => handleFilterClick(e, "chgPercent")}
                    >
                      <Image src="/filter.svg" alt="filter" width={24} height={24} className="opacity-70" />
                    </div>
                  </div>
                </th>
              )}
              {visibleColumns.chg && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between">
                    CHG
                    <div
                      className="w-6 h-6 flex items-center justify-center ml-2 cursor-pointer"
                      onClick={(e) => handleFilterClick(e, "chg")}
                    >
                      <Image src="/filter.svg" alt="filter" width={24} height={24} className="opacity-70" />
                    </div>
                  </div>
                </th>
              )}
              {visibleColumns.technicalRating1 && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px] md:w-[160px]">
                  <div className="flex items-center justify-between">Technical Rating</div>
                </th>
              )}
              {visibleColumns.technicalRating2 && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px] md:w-[160px]">
                  <div className="flex items-center justify-between">Technical Rating</div>
                </th>
              )}
              {visibleColumns.volume && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between">
                    VOL
                    <div
                      className="w-6 h-6 flex items-center justify-center ml-2 cursor-pointer"
                      onClick={(e) => handleFilterClick(e, "volume")}
                    >
                      <Image src="/filter.svg" alt="filter" width={24} height={24} className="opacity-70" />
                    </div>
                  </div>
                </th>
              )}
              {visibleColumns.volumePrice && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px] md:w-[120px]">
                  <div className="flex items-center justify-between">
                    Volume/Price
                    <div
                      className="w-6 h-6 flex items-center justify-center ml-2 cursor-pointer"
                      onClick={(e) => handleFilterClick(e, "volumePrice")}
                    >
                      <Image src="/filter.svg" alt="filter" width={24} height={24} className="opacity-70" />
                    </div>
                  </div>
                </th>
              )}
              {visibleColumns.mktCap && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between">MKT CAP</div>
                </th>
              )}
              {visibleColumns.pe && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[60px] md:w-[80px]">
                  <div className="flex items-center justify-between">P/E</div>
                </th>
              )}
              {visibleColumns.eps && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px] md:w-[100px]">
                  <div className="flex items-center justify-between">EPS (TTM)</div>
                </th>
              )}
              {visibleColumns.sector && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px] md:w-[180px]">
                  <div className="flex items-center justify-between">
                    SECTOR
                    <div
                      className="w-6 h-6 flex items-center justify-center ml-2 cursor-pointer"
                      onClick={(e) => handleFilterClick(e, "eps")}
                    >
                      <Image src="/filter.svg" alt="filter" width={24} height={24} className="opacity-70" />
                    </div>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <TableRow key={row.id} row={row} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Dropdown */}
      {activeFilter && (
        <FilterDropdown column={activeFilter} onClose={() => setActiveFilter(null)} position={filterPosition} />
      )}
    </div>
  )
}
