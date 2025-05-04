"use client"

import { useRef, useEffect } from "react"
import { AutoSizer, List, type ListRowProps } from "react-virtualized"
import { useVirtualizedTable } from "../hooks/useVirtualizedTable"
import type { StockData } from "../types/index"

interface VirtualizedTableProps {
  data: StockData[]
  rowHeight?: number
  headerHeight?: number
}

export default function VirtualizedTable({ data, rowHeight = 48, headerHeight = 52 }: VirtualizedTableProps) {
  const listRef = useRef<List>(null)
  const { paginatedData, handleSort, sortField, sortDirection } = useVirtualizedTable<StockData>(data)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.forceUpdateGrid()
    }
  }, [paginatedData])

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    const item = paginatedData[index]
    if (!item) return null

    return (
      <div
        key={key}
        style={style}
        className="h-12 flex items-center border-b border-dashboard-border hover:bg-dashboard-hover hover:cursor-pointer"
      >
        <div className="w-[120px] pl-4">{item.symbol}</div>
        <div className="w-[180px]">{item.company}</div>
        <div className={`w-[100px] ${item.chgPercent < 0 ? "text-red-500" : "text-green-500"}`}>
          {item.chgPercent.toFixed(2)}%
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-200px)] w-full">
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef}
            width={width}
            height={height}
            rowCount={paginatedData.length}
            rowHeight={rowHeight}
            rowRenderer={rowRenderer}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    </div>
  )
}
