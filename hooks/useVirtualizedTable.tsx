"use client"

import { useCallback, useState } from "react"

export function useVirtualizedTable<T>(data: T[], itemsPerPage = 20) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const sortedData = useCallback(() => {
    if (!sortField) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [data, sortField, sortDirection])

  const paginatedData = useCallback(() => {
    const sorted = sortedData()
    const startIndex = (currentPage - 1) * itemsPerPage
    return sorted.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage])

  const handleSort = useCallback(
    (field: keyof T) => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
      } else {
        setSortField(field)
        setSortDirection("asc")
      }
    },
    [sortField, sortDirection],
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return {
    currentPage,
    totalPages,
    paginatedData: paginatedData(),
    handleSort,
    handlePageChange,
    sortField,
    sortDirection,
  }
}
