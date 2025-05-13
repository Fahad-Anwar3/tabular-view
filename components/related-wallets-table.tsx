"use client"

import { useState } from "react"

export default function RelatedWalletsTable() {
  const [timeFilter, setTimeFilter] = useState("30d")

  // Time filter options
  const timeFilters = ["1d", "7d", "30d", "All"]

  const relatedWallets = [
    {
      id: 1,
      name: "GeBx...toz6",
      fullName: "GeBx...toz6",
      icon: "LAY",
      inflow: "$0",
      outflow: "$430,133",
      txIn: "0",
      txOut: "0",
      balance: "5.6 SOL",
      balanceUsd: "($0)",
      tag: "High Volume Dex Trader",
      isNew: true,
    },
    {
      id: 2,
      name: "GeBx...toz6",
      fullName: "GeBx...toz6",
      icon: "LAY",
      inflow: "$0",
      outflow: "$430,133",
      txIn: "0",
      txOut: "0",
      balance: "5.6 SOL",
      balanceUsd: "($0)",
    },
    {
      id: 3,
      name: "GeBx...toz6",
      fullName: "GeBx...toz6",
      icon: "LAY",
      inflow: "$0",
      outflow: "$430,133",
      txIn: "0",
      txOut: "0",
      balance: "5.6 SOL",
      balanceUsd: "($0)",
      tag: "High Volume Dex Trader",
      isNew: true,
    },
    {
      id: 4,
      name: "GeBx...toz6",
      fullName: "GeBx...toz6",
      icon: "LAY",
      inflow: "$0",
      outflow: "$430,133",
      txIn: "0",
      txOut: "0",
      balance: "5.6 SOL",
      balanceUsd: "($0)",
    },
    {
      id: 5,
      name: "GeBx...toz6",
      fullName: "GeBx...toz6",
      icon: "LAY",
      inflow: "$0",
      outflow: "$430,133",
      txIn: "0",
      txOut: "0",
      balance: "5.6 SOL",
      balanceUsd: "($0)",
      tag: "High Volume Dex Trader",
      isNew: true,
    },
    {
      id: 6,
      name: "GeBx...toz6",
      fullName: "GeBx...toz6",
      icon: "LAY",
      inflow: "$0",
      outflow: "$430,133",
      txIn: "0",
      txOut: "0",
      balance: "5.6 SOL",
      balanceUsd: "($0)",
    },
    {
      id: 7,
      name: "GeBx...toz6",
      fullName: "GeBx...toz6",
      icon: "LAY",
      inflow: "$0",
      outflow: "$430,133",
      txIn: "0",
      txOut: "0",
      balance: "5.6 SOL",
      balanceUsd: "($0)",
      tag: "High Volume Dex Trader",
      isNew: true,
    },
  ]

  return (
    <div className="bg-[#000B13] rounded-xl border border-[#284c8f] overflow-hidden p-2 sm:p-4">
      {/* Time Filter */}
      <div className="flex space-x-2 sm:space-x-4 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            className={`rounded-full px-2 sm:px-3 py-1 text-xs whitespace-nowrap flex-shrink-0 ${
              timeFilter === filter ? "bg-[#26DBD6] text-[#000B13]" : "border border-[#1a2436] text-[#4A5568]"
            }`}
            onClick={() => setTimeFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table Headers - Desktop */}
      <div className="hidden md:grid grid-cols-6 gap-2 sm:gap-4 mb-2 sm:mb-4 text-[#26DBD6] text-xs font-bold px-2 sm:px-4 uppercase">
        <div>Token</div>
        <div className="text-center">Inflow</div>
        <div className="text-center">Outflow</div>
        <div className="text-center">Tx In</div>
        <div className="text-center">Tx Out</div>
        <div className="text-center">Balance</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2 sm:space-y-4">
        {relatedWallets.map((wallet) => (
          <div key={wallet.id} className="bg-[#001422] rounded-xl p-3 sm:p-4">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-6 items-center">
              {/* Token Column */}
              <div className="flex items-center gap-3">
                <div className="bg-[#1a2436] rounded-full h-10 w-10 flex items-center justify-center text-white">
                  {wallet.icon}
                </div>
                <div>
                  <div className="text-white">{wallet.name}</div>
                  <div className="text-[#4A5568] text-xs">{wallet.fullName}</div>
                  {wallet.tag && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-blue-200 text-[10px] bg-[#0F284F] rounded px-2 py-1">{wallet.tag}</div>
                      {wallet.isNew && (
                        <div className="text-blue-200 text-[10px] bg-[#0F284F] px-2 py-1 rounded">NEW</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Inflow Column */}
              <div className="text-center">
                <div className="text-[#26DBD6]">{wallet.inflow}</div>
                <div className="bg-[#26DBD6]/20 h-1 w-12 mx-auto rounded-full mt-1 overflow-hidden">
                  <div className="bg-[#26DBD6] h-full w-1/3 rounded-full"></div>
                </div>
              </div>

              {/* Outflow Column */}
              <div className="text-center">
                <div className="text-[#FF4D6D]">{wallet.outflow}</div>
                <div className="bg-[#FF4D6D]/20 h-1 w-12 mx-auto rounded-full mt-1 overflow-hidden">
                  <div className="bg-[#FF4D6D] h-full w-2/3 rounded-full"></div>
                </div>
              </div>

              {/* TX In Column */}
              <div className="text-center">
                <div className="text-white">{wallet.txIn}</div>
              </div>

              {/* TX Out Column */}
              <div className="text-center">
                <div className="text-white">{wallet.txOut}</div>
              </div>

              {/* Balance Column */}
              <div className="text-center">
                <div className="text-[#26DBD6]">
                  {wallet.balance} <span className="text-[#4A5568]">{wallet.balanceUsd}</span>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
              {/* Top Row: Token info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#1a2436] rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center text-white text-xs sm:text-sm">
                  {wallet.icon}
                </div>
                <div>
                  <div className="text-white text-sm">{wallet.name}</div>
                  <div className="text-[#4A5568] text-xs">{wallet.fullName}</div>
                  {wallet.tag && (
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <div className="text-blue-200 text-[10px] bg-[#0F284F] rounded px-2 py-0.5">{wallet.tag}</div>
                      {wallet.isNew && (
                        <div className="text-blue-200 text-[10px] bg-[#0F284F] px-2 py-0.5 rounded">NEW</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Middle Row: Flow info */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-[#4A5568] text-[10px] mb-1">Inflow</div>
                  <div className="text-[#26DBD6] text-sm">{wallet.inflow}</div>
                  <div className="bg-[#26DBD6]/20 h-1 w-12 rounded-full mt-1 overflow-hidden">
                    <div className="bg-[#26DBD6] h-full w-1/3 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="text-[#4A5568] text-[10px] mb-1">Outflow</div>
                  <div className="text-[#FF4D6D] text-sm">{wallet.outflow}</div>
                  <div className="bg-[#FF4D6D]/20 h-1 w-12 rounded-full mt-1 overflow-hidden">
                    <div className="bg-[#FF4D6D] h-full w-2/3 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Transactions and Balance */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="text-[#4A5568] text-[10px] mb-1">Tx In</div>
                  <div className="text-white text-sm">{wallet.txIn}</div>
                </div>

                <div>
                  <div className="text-[#4A5568] text-[10px] mb-1">Tx Out</div>
                  <div className="text-white text-sm">{wallet.txOut}</div>
                </div>

                <div>
                  <div className="text-[#4A5568] text-[10px] mb-1">Balance</div>
                  <div className="text-[#26DBD6] text-sm">
                    {wallet.balance} <span className="text-[#4A5568] text-xs">{wallet.balanceUsd}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4 text-xs sm:text-sm mt-2 sm:mt-4">
        <div className="text-[#4A5568] mb-3 sm:mb-0 text-center sm:text-left">Viewing 10 to 90 out of 0 items</div>

        <div className="flex items-center gap-1">
          <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[#26DBD6] border border-[#1a2436]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-4 sm:h-4"
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full ${
                  page === 2 ? "bg-[#26DBD6] text-[#000B13]" : "text-[#4A5568] hover:text-[#26DBD6]"
                }`}
              >
                {page}
              </button>
            ))}

            <span className="text-[#4A5568]">...</span>

            <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[#4A5568] hover:text-[#26DBD6]">
              16
            </button>
          </div>

          <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[#26DBD6] border border-[#1a2436]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-4 sm:h-4"
            >
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
