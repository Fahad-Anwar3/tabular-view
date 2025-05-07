"use client"

import { useState } from "react"
import { Search, Download, ChevronDown, Menu, X } from "lucide-react"
import FilterModal from "./FilterModal"
import Image from "next/image"

export default function Header() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-dashboard-header border-b border-dashboard-border p-2 md:p-4">
        <div className="flex justify-between items-center px-2 md:px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input type="text" placeholder="Search for..." className="search-input pl-10 w-[120px] md:w-[180px]" />
            </div>
            <div className="relative hidden md:block">
              <select className="header-select appearance-none pr-8 w-[120px]">
                <option>Overview</option>
                <option>Performance</option>
                <option>Technical</option>
                <option>Fundamental</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="header-button hidden md:flex">
              <Search className="h-4 w-4" />
            </button>
            <button className="header-button hidden md:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button className="md:hidden header-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="hidden md:flex border-dashboard-border overflow-x-auto">
            <button className="px-4 py-2 text-white border-b-2 border-[#26dbd6]">Overview</button>
            <button className="px-4 py-2 text-gray-400 hover:text-white">Performance</button>
            <button className="px-4 py-2 text-gray-400 hover:text-white">Overview</button>
            <button className="px-4 py-2 text-gray-400 hover:text-white">Overview</button>
            <button className="px-4 py-2 text-gray-400 hover:text-white">Overview</button>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative hidden md:block">
              <select className="header-select appearance-none pr-8 w-[80px]">
                <option>USD</option>
                <option>CAD</option>
                <option>CNY</option>
                <option>YEN</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <button className="header-button" onClick={() => setIsFilterModalOpen(true)}>
              <Image src="/filter-m.png" alt="filter" width={24} height={24} className="md:w-[32px] md:h-[32px]" />
            </button>

            <button className="header-button hidden md:flex">
              <Download className="h-4 w-4" />
            </button>

            <div className="relative hidden md:block">
              <select className="header-select appearance-none pr-8 w-[60px]">
                <option>1m</option>
                <option>5m</option>
                <option>15m</option>
                <option>1h</option>
                <option>1d</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-dashboard-border py-2 px-4">
            <div className="flex flex-col space-y-3">
              <div className="flex overflow-x-auto py-2 gap-2">
                <button className="px-3 py-1 text-white border-b border-[#26dbd6] whitespace-nowrap">Overview</button>
                <button className="px-3 py-1 text-gray-400 hover:text-white whitespace-nowrap">Performance</button>
                <button className="px-3 py-1 text-gray-400 hover:text-white whitespace-nowrap">Technical</button>
                <button className="px-3 py-1 text-gray-400 hover:text-white whitespace-nowrap">Fundamental</button>
              </div>

              <div className="flex justify-between items-center">
                <div className="relative">
                  <select className="header-select appearance-none pr-8 w-[80px]">
                    <option>USD</option>
                    <option>CAD</option>
                    <option>CNY</option>
                    <option>YEN</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select className="header-select appearance-none pr-8 w-[60px]">
                    <option>1m</option>
                    <option>5m</option>
                    <option>15m</option>
                    <option>1h</option>
                    <option>1d</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                <button className="header-button">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />
    </>
  )
}
