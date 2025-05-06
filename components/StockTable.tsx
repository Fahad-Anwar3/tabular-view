"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
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

export default function StockTable() {
  const [data, setData] = useState<StockData[]>([])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 })
  const tableRef = useRef<HTMLDivElement>(null)

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
    <div className="bg-[#000B13] border border-[#1e3a5f] rounded-none overflow-hidden relative" ref={tableRef}>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#000B13] border-b border-[#1e3a5f]">
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px]">
                <div className="flex">
                  <p>Symbol</p>
                
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[180px]">
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
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
                <div className="flex items-center justify-between">
                  CHG%
                  <div
                    className="w-7 h-6 flex items-center justify-center ml-2 cursor-pointer"
                    onClick={(e) => handleFilterClick(e, "chgPercent")}
                  >
                    <Image src="/filter.svg" alt="filter" width={24} height={24} className="opacity-70" />
                  </div>
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
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
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[160px]">
                <div className="flex items-center justify-between">
                  Technical Rating
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[160px]">
                <div className="flex items-center justify-between">
                  Technical Rating
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
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
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px]">
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
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
                <div className="flex items-center justify-between">
                  MKT CAP
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px]">
                <div className="flex items-center justify-between">
                  P/E
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
                <div className="flex items-center justify-between">
                  EPS (TTM)

                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[180px]">
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
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-[#1e3a5f] ${index % 2 === 1 ? "bg-[#0c1e33]" : "bg-[#0a1929]"} hover:bg-[#1e3a5f]`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#76b900] rounded-sm mr-2 flex items-center justify-center">
                      <span className="text-xs text-white">N</span>
                    </div>
                    <span className="font-medium">NVDA</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-300">NVIDIA CORPORATION</td>
                <td className={`py-3 px-4 ${getValueClass(row.chgPercent)}`}>
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
                <td className={`py-3 px-4 ${getValueClass(row.chg)}`}>
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
                <td className={`py-3 px-4`}>
                  <div className={getRatingClass(row.technicalRating1)}>
                    {renderRatingIcon(row.technicalRating1)}
                    {row.technicalRating1}
                  </div>
                </td>
                <td className={`py-3 px-4`}>
                  <div className={getRatingClass(row.technicalRating2)}>
                    {renderRatingIcon(row.technicalRating2)}
                    {row.technicalRating2}
                  </div>
                </td>
                <td className="py-3 px-4">{row.volume}</td>
                <td className="py-3 px-4">{row.volumePrice}</td>
                <td className="py-3 px-4">{row.mktCap}</td>
                <td className="py-3 px-4">{row.pe}</td>
                <td className="py-3 px-4">{row.eps}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span>Consumer Non-Durables</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Dropdown */}
      {activeFilter && (
        <div
          style={{
            position: "absolute",
            top: `${filterPosition.top}px`,
            left: `${filterPosition.left}px`,
            zIndex: 50,
          }}
        >
          <FilterDropdown column={activeFilter} onClose={() => setActiveFilter(null)} />
        </div>
      )}
    </div>
  )
}
