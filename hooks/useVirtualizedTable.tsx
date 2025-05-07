"use client"

import type React from "react"

import { useCallback, useState, useEffect, useRef } from "react"

interface UseVirtualizedTableOptions {
  itemCount: number
  itemHeight: number
  overscan?: number
  containerRef: React.RefObject<HTMLElement>
}

interface VirtualItem {
  index: number
  start: number
  size: number
}

export function useVirtualizedTable({ itemCount, itemHeight, overscan = 3, containerRef }: UseVirtualizedTableOptions) {
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const requestRef = useRef<number | null>(null)

  // Calculate visible items based on scroll position with optimized performance
  const calculateVisibleItems = useCallback(() => {
    if (!containerRef.current) return { virtualItems: [], startIndex: 0, endIndex: 0 }

    const currentScrollTop = containerRef.current.scrollTop || 0
    const currentContainerHeight = containerRef.current.clientHeight || 0

    setScrollTop(currentScrollTop)
    setContainerHeight(currentContainerHeight)

    const startIndex = Math.max(0, Math.floor(currentScrollTop / itemHeight) - overscan)
    const endIndex = Math.min(
      itemCount - 1,
      Math.ceil((currentScrollTop + currentContainerHeight) / itemHeight) + overscan,
    )

    const virtualItems: VirtualItem[] = []
    for (let i = startIndex; i <= endIndex; i++) {
      virtualItems.push({
        index: i,
        start: i * itemHeight,
        size: itemHeight,
      })
    }

    return { virtualItems, startIndex, endIndex }
  }, [itemCount, itemHeight, overscan, containerRef])

  const [state, setState] = useState(() => calculateVisibleItems())

  // Update visible items when scroll position changes with requestAnimationFrame for better performance
  useEffect(() => {
    if (!containerRef.current) return

    const handleScroll = () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }

      requestRef.current = requestAnimationFrame(() => {
        setState(calculateVisibleItems())
      })
    }

    const container = containerRef.current
    container.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)

    // Initial calculation
    handleScroll()

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [calculateVisibleItems, containerRef])

  return {
    virtualItems: state.virtualItems,
    totalHeight: itemCount * itemHeight,
    startIndex: state.startIndex,
    endIndex: state.endIndex,
  }
}
