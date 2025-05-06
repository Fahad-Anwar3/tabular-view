"use client"

import { useState } from "react"

interface FilterDropdownProps {
  column: string
  onClose: () => void
}

export default function FilterDropdown({ column, onClose }: FilterDropdownProps) {
  const [condition, setCondition] = useState("Below")
  const [type, setType] = useState("Value")
  const [value, setValue] = useState("16084481")

  return (
    <div className="absolute z-50 w-[470px] rounded-xl bg-[#0a1929] border border-[#1e3a5f] shadow-xl">
      <div className="p-4 space-y-4 text-sm text-white">
        <div className="text-gray-200 font-medium">Symbol Type</div>

        <div className="grid grid-cols-2 gap-4">
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
