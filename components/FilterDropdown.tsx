"use client"

import { useState, useEffect, useRef } from "react"

interface FilterDropdownProps {
  column: string
  onClose: () => void
  position?: { top: number; left: number }
}

export default function FilterDropdown({ column, position, onClose }: FilterDropdownProps) {
  const [condition, setCondition] = useState("Below")
  const [type, setType] = useState("Value")
  const [value, setValue] = useState("16084481")
  const [dropdownPosition, setDropdownPosition] = useState<{
    left: string | number
    right?: string | number
    top: string | number
  }>({
    left: 0,
    top: 0,
  })
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Adjust position to prevent going off-screen
  useEffect(() => {
    if (dropdownRef.current && position) {
      const dropdownWidth = dropdownRef.current.offsetWidth
      const dropdownHeight = dropdownRef.current.offsetHeight
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Handle horizontal positioning
      let horizontalPosition: { left: string | number; right?: string | number } = { left: position.left }

      if (position.left + dropdownWidth > viewportWidth - 20) {
        horizontalPosition = {
          right: 20,
          left: "auto",
        }
      }

      // Handle vertical positioning
      let verticalPosition = position.top

      if (position.top + dropdownHeight > viewportHeight - 20) {
        verticalPosition = Math.max(20, position.top - dropdownHeight)
      }

      setDropdownPosition({
        ...horizontalPosition,
        top: verticalPosition,
      })
    }
  }, [position])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Close on escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [onClose])

  return (
    <>
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />

      <div
        ref={dropdownRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Filter ${column}`}
        className="fixed z-50 w-[90vw] max-w-[300px] md:max-w-[470px] rounded-xl bg-[#0a1929] border border-[#1e3a5f] shadow-xl transition-all duration-200"
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          right: dropdownPosition.right,
        }}
      >
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 text-sm text-white">
          <div className="flex items-center justify-between">
            <div className="text-gray-200 font-medium">Filter {column}</div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-full"
              aria-label="Close filter"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <div className="text-gray-400 text-xs sm:text-sm">Condition</div>
              <div className="relative">
                <select
                  className="w-full rounded-md bg-[#060c13] border border-[#1e3a5f] px-2 sm:px-3 py-2 text-white text-xs sm:text-sm appearance-none"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option>Below</option>
                  <option>Above</option>
                  <option>Equal</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-400 text-xs sm:text-sm">Type</div>
              <div className="relative">
                <select
                  className="w-full rounded-md bg-[#060c13] border border-[#1e3a5f] px-2 sm:px-3 py-2 text-white text-xs sm:text-sm appearance-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Value</option>
                  <option>Percentage</option>
                  <option>Range</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-gray-400 text-xs sm:text-sm">Value</div>
            <input
              type="text"
              className="w-full rounded-md bg-[#060c13] border border-[#1e3a5f] px-2 sm:px-3 py-2 text-white text-xs sm:text-sm"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

        </div>
      </div>
    </>
  )
}
