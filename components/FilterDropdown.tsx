"use client"

import { useState, useEffect, useRef } from "react"

interface FilterDropdownProps {
  column: string
  onClose: () => void
  position?: { top: number; left: number }
}

export default function FilterDropdown({ column, onClose, position }: FilterDropdownProps) {
  const [condition, setCondition] = useState("Below")
  const [type, setType] = useState("Value")
  const [value, setValue] = useState("16084481")
  const [dropdownPosition, setDropdownPosition] = useState<{ left: string | number; right?: string | number }>({
    left: 0,
  })
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Adjust position to prevent going off-screen
  useEffect(() => {
    if (dropdownRef.current && position) {
      const dropdownWidth = dropdownRef.current.offsetWidth
      const viewportWidth = window.innerWidth

      // Check if dropdown would go off the right edge of the screen
      if (position.left + dropdownWidth > viewportWidth - 20) {
        // Position from the right instead of left
        setDropdownPosition({
          right: viewportWidth - position.left,
          left: "auto",
        })
      } else {
        // Normal left positioning
        setDropdownPosition({ left: position.left })
      }
    }
  }, [position])

  return (
    <div
      ref={dropdownRef}
      className="fixed z-50 w-[300px] md:w-[470px] rounded-xl bg-[#0a1929] border border-[#1e3a5f] shadow-xl mt-4"
      style={{
        top: position?.top || 0,
        left: dropdownPosition.left,
        right: dropdownPosition.right,
      }}
    >
      <div className="p-4 space-y-4 text-sm text-white">
        <div className="text-gray-200 font-medium">Symbol Type</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-gray-400">Condition</div>
            <div className="relative">
              <select
                className="w-full rounded-md bg-[#060c13] border border-[#1e3a5f] px-3 py-2 text-white text-sm appearance-none"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option>Below</option>
                <option>Above</option>
                <option>Equal</option>
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-400">Type</div>
            <div className="relative">
              <select
                className="w-full rounded-md bg-[#060c13] border border-[#1e3a5f] px-3 py-2 text-white text-sm appearance-none"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Value</option>
                <option>Percentage</option>
                <option>Range</option>
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-400">Value</div>
          <input
            type="text"
            className="w-full rounded-md bg-[#060c13] border border-[#1e3a5f] px-3 py-2 text-white text-sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
