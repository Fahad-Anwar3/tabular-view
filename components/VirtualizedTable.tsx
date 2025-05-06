"use client"

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
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setData(stockData)

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

  const handleFilterClick = (column: string) => {
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
          src="/filter.png"
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
        <span className="text-sm text-gray-300">3,524 matches</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0f2132] border-b border-[#1e3a5f]">
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px]">
                <div className="flex items-center justify-between relative">
                  Symbol
                  {renderFilterIcon("symbol")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[180px]">
                <div className="flex items-center justify-between relative">
                  Company
                  {renderFilterIcon("company")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
                <div className="flex items-center justify-between relative">CHG %{renderFilterIcon("chgPercent")}</div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
                <div className="flex items-center justify-between relative">
                  CHG
                  {renderFilterIcon("chg")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[160px]">
                <div className="flex items-center justify-between relative">
                  Technical Rating
                  {renderFilterIcon("technicalRating1")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[160px]">
                <div className="flex items-center justify-between relative">
                  Technical Rating
                  {renderFilterIcon("technicalRating2")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
                <div className="flex items-center justify-between relative">
                  VOL
                  {renderFilterIcon("volume")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[120px]">
                <div className="flex items-center justify-between relative">
                  Volume/Price
                  {renderFilterIcon("volumePrice")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
                <div className="flex items-center justify-between relative">
                  MKT CAP
                  {renderFilterIcon("mktCap")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[80px]">
                <div className="flex items-center justify-between relative">
                  P/E
                  {renderFilterIcon("pe")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[100px]">
                <div className="flex items-center justify-between relative">
                  EPS (TTM)
                  {renderFilterIcon("eps")}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-[#26dbd6] font-medium text-xs uppercase w-[180px]">
                <div className="flex items-center justify-between">SECTOR</div>
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
                    <Image src="/nvidia 1.png" alt="" width={20} height={20}/>
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
    </div>
  )
}
