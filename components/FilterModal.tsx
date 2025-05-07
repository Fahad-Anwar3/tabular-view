"use client"

import { useState, useEffect } from "react"
import { X, Search, RotateCcw } from "lucide-react"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const [activeTab, setActiveTab] = useState("All")
  const [searchValue, setSearchValue] = useState("")
  const [primaryListingOn, setPrimaryListingOn] = useState(true)
  const [tradingDayOn, setTradingDayOn] = useState(false)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50   p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-dashboard-background border border-dashboard-border rounded-md">
        <div className="flex justify-between items-center p-4 border-b border-dashboard-border">
          <h2 className="text-xl md:text-2xl font-bold text-white">Filters</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex overflow-x-auto border-b border-dashboard-border">
          {["All", "Descriptive", "Financials", "Technicals"].map((tab) => (
            <button
              key={tab}
              className={`px-4 md:px-8 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === tab ? "text-white border-b-2 border-[#26dbd6]" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="<50 K"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-dashboard-background border border-dashboard-border rounded-md py-2 pl-10 pr-3 text-white"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-dashboard-background border border-dashboard-border rounded-md px-4 py-2 text-white hover:bg-[#1e3a5f] transition-colors">
            <RotateCcw className="h-4 w-4" />
            <span>RESET ALL</span>
          </button>
        </div>
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="relative">
                <select className="w-full appearance-none bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white pr-10">
                  <option>Depository Receipt, Common Stock</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="relative">
                <select className="w-full appearance-none bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white pr-10">
                  <option>Depository Receipt, Common Stock</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Primary Listing</label>
              <div className="flex items-center">
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${primaryListingOn ? "bg-[#26dbd6]" : "bg-dashboard-border"}`}
                  onClick={() => setPrimaryListingOn(!primaryListingOn)}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      primaryListingOn ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="ml-2 text-white">Turned on</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Current trading day</label>
              <div className="flex items-center">
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${tradingDayOn ? "bg-[#26dbd6]" : "bg-dashboard-border"}`}
                  onClick={() => setTradingDayOn(!tradingDayOn)}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      tradingDayOn ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="ml-2 text-white">Turn on</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="<50 K"
                  className="w-24 bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white"
                />
                <div className="flex-1 px-2">
                  <div className="h-2 bg-dashboard-border rounded-full">
                    <div className="h-2 bg-[#26dbd6] rounded-full w-1/2"></div>
                  </div>
                </div>
                <input
                  type="text"
                  value="13"
                  className="w-24 bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="relative">
                <select className="w-full appearance-none bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white pr-10">
                  <option>Depository Receipt, Common Stock</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="relative">
                <select className="w-full appearance-none bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white pr-10">
                  <option>Select</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="<50 K"
                  className="w-24 bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white"
                />
                <div className="flex-1 px-2">
                  <div className="h-2 bg-dashboard-border rounded-full">
                    <div className="h-2 bg-[#26dbd6] rounded-full w-1/2"></div>
                  </div>
                </div>
                <input
                  type="text"
                  value="13"
                  className="w-24 bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Condition</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white pr-10">
                      <option>Depository Receipt</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Type</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white pr-10">
                      <option>Depository Receipt</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Value</label>
                <input
                  type="text"
                  value="16084481"
                  className="w-full bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="relative">
                <select className="w-full appearance-none bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white pr-10">
                  <option>Depository Receipt, Common Stock</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="<50 K"
                  className="w-24 bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white"
                />
                <div className="flex-1 px-2">
                  <div className="h-2 bg-dashboard-border rounded-full">
                    <div className="h-2 bg-[#26dbd6] rounded-full w-1/2"></div>
                  </div>
                </div>
                <input
                  type="text"
                  value="13"
                  className="w-24 bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Symbol Type</label>
              <div className="relative">
                <select className="w-full appearance-none bg-dashboard-background border border-dashboard-border rounded-md py-2 px-3 text-white pr-10">
                  <option>Depository Receipt, Common Stock</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
