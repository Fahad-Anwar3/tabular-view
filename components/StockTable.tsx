"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { stockData } from "../data/stockData"

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

  useEffect(() => {
    setData(stockData)
  }, [])

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
    if (rating === "Strong Buy") return "strong-buy"
    if (rating === "Buy") return "buy"
    if (rating === "Strong Sell") return "strong-sell"
    if (rating === "Sell") return "sell"
    return "neutral"
  }

  const getValueClass = (value: number) => {
    if (value > 0) return "positive-value"
    if (value < 0) return "negative-value"
    return "neutral-value"
  }

  return (
    <div className="bg-dashboard-background border border-dashboard-border rounded-none overflow-hidden">
      <div className="bg-dashboard-tableHeader p-2 flex justify-between items-center">
        <span className="text-sm text-gray-300">3,524 matches</span>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-[120px]">
                <div className="flex items-center justify-between">
                  SYMBOL
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[180px]">
                <div className="flex items-center justify-between">
                  COMPANY
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[100px]">
                <div className="flex items-center justify-between">
                  CHG %
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[100px]">
                <div className="flex items-center justify-between">
                  CHG
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[160px]">
                <div className="flex items-center justify-between">
                  TECHNICAL RATING
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[160px]">
                <div className="flex items-center justify-between">
                  TECHNICAL RATING
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[100px]">
                <div className="flex items-center justify-between">
                  VOL
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[120px]">
                <div className="flex items-center justify-between">
                  VOLUME/PRICE
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[100px]">
                <div className="flex items-center justify-between">
                  MKT CAP
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[80px]">
                <div className="flex items-center justify-between">
                  P/E
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[100px]">
                <div className="flex items-center justify-between">
                  EPS (TTM)
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="w-[180px]">
                <div className="flex items-center justify-between">SECTOR</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#76b900] rounded-sm mr-2 flex items-center justify-center">
                      <span className="text-xs text-white">N</span>
                    </div>
                    <span className="font-medium">NVDA</span>
                  </div>
                </td>
                <td className="text-gray-300">NVIDIA CORPORATION</td>
                <td className={getValueClass(row.chgPercent)}>
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
                <td className={getValueClass(row.chg)}>
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
                <td className={getRatingClass(row.technicalRating1)}>
                  {renderRatingIcon(row.technicalRating1)}
                  {row.technicalRating1}
                </td>
                <td className={getRatingClass(row.technicalRating2)}>
                  {renderRatingIcon(row.technicalRating2)}
                  {row.technicalRating2}
                </td>
                <td>{row.volume}</td>
                <td>{row.volumePrice}</td>
                <td>{row.mktCap}</td>
                <td>{row.pe}</td>
                <td>{row.eps}</td>
                <td>
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
