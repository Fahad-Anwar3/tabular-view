"use client"

import { ChevronDown, CopyIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function WalletList() {
  const [activeTab, setActiveTab] = useState("Token PnL")
  const [currentPage, setCurrentPage] = useState(2)

  // Tab options
  const tabs = ["All", "Portfolio", "Token PnL", "Related Wallets"]

  // Static data for wallet list
  const wallets = [
    {
      id: 1,
      address: "2zBoK...CMg",
      fullAddress: "2zBoKrC3A7MzNpv7hozAe4v7FvXSXSvLmBCMg",
      balance: "$450k",
      blockchain: "Solana",
      protocol: "GMX V2, GMX V1",
      market: "SPOT",
      runtime: "207 Days",
      tradeDuration: "4 Days",
    },
    {
      id: 2,
      address: "2zBoK...CMg",
      fullAddress: "2zBoKrC3A7MzNpv7hozAe4v7FvXSXSvLmBCMg",
      balance: "$450k",
      blockchain: "Solana",
      protocol: "GMX V2, GMX V1",
      market: "SPOT",
      runtime: "207 Days",
      tradeDuration: "4 Days",
    },
    {
      id: 3,
      address: "2zBoK...CMg",
      fullAddress: "2zBoKrC3A7MzNpv7hozAe4v7FvXSXSvLmBCMg",
      balance: "$450k",
      blockchain: "Solana",
      protocol: "GMX V2, GMX V1",
      market: "SPOT",
      runtime: "207 Days",
      tradeDuration: "4 Days",
    },
    {
      id: 4,
      address: "2zBoK...CMg",
      fullAddress: "2zBoKrC3A7MzNpv7hozAe4v7FvXSXSvLmBCMg",
      balance: "$450k",
      blockchain: "Solana",
      protocol: "GMX V2, GMX V1",
      market: "SPOT",
      runtime: "207 Days",
      tradeDuration: "4 Days",
    },
    {
      id: 5,
      address: "2zBoK...CMg",
      fullAddress: "2zBoKrC3A7MzNpv7hozAe4v7FvXSXSvLmBCMg",
      balance: "$450k",
      blockchain: "Solana",
      protocol: "GMX V2, GMX V1",
      market: "SPOT",
      runtime: "207 Days",
      tradeDuration: "4 Days",
    },
    {
      id: 6,
      address: "2zBoK...CMg",
      fullAddress: "2zBoKrC3A7MzNpv7hozAe4v7FvXSXSvLmBCMg",
      balance: "$450k",
      blockchain: "Solana",
      protocol: "GMX V2, GMX V1",
      market: "SPOT",
      runtime: "207 Days",
      tradeDuration: "4 Days",
    },
    {
      id: 7,
      address: "2zBoK...CMg",
      fullAddress: "2zBoKrC3A7MzNpv7hozAe4v7FvXSXSvLmBCMg",
      balance: "$450k",
      blockchain: "Solana",
      protocol: "GMX V2, GMX V1",
      market: "SPOT",
      runtime: "207 Days",
      tradeDuration: "4 Days",
    },
  ]

  // Generate pagination array
  const totalPages = 16
  const paginationItems = []
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(i)
  }

  return (
    <div className="bg-[#000B13] rounded-xl border border-[#284c8f] overflow-hidden p-4">
      {/* Tab Bar */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-[#00101A] mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 sm:px-6 py-3 w-full pb-4 text-sm whitespace-nowrap ${
              activeTab === tab ? "text-[#26DBD6] border-b-2 border-[#26DBD6]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Wallet List */}
      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="p-4 bg-[#001422] rounded-xl flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="items-center gap-2 mb-4 md:mb-0 w-full md:w-auto">
              <div className="text-white font-medium pb-2">{wallet.address}</div>
              <div className="flex items-center justify-between md:justify-start">
                <div className="text-[#4A5568] text-[10px] truncate max-w-[200px] md:max-w-none">
                  {wallet.fullAddress}
                </div>
                <div className="text-[#26DBD6] pl-4 cursor-pointer">
                  <CopyIcon className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 mb-4 lg:mb-0">
              <div className="text-center">
                <div className="text-xs text-[#4A5568] mb-1">Blockchain</div>
                <div className="flex items-center justify-center">
                  <Image src="/image.svg" alt="image" width={20} height={20} />
                  <span className="text-sm text-[#26DBD6] pl-2">{wallet.blockchain}</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-[#4A5568] mb-1">Protocol</div>
                <div className="text-sm text-white">{wallet.protocol}</div>
              </div>

              <div className="text-center">
                <div className="text-xs text-[#4A5568] mb-1">Market</div>
                <div className="text-sm text-white">{wallet.market}</div>
              </div>

              <div className="text-center">
                <div className="text-xs text-[#4A5568] mb-1">Runtime</div>
                <div className="text-sm text-white">{wallet.runtime}</div>
              </div>

              <div className="text-center">
                <div className="text-xs text-[#4A5568] mb-1">Average Trade Duration</div>
                <div className="text-sm text-white">{wallet.tradeDuration}</div>
              </div>
            </div>

            <button className="bg-[#001726] hover:bg-[#1a2436] text-gray-400 text-xs px-4 py-2 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.15)] flex items-center justify-center gap-1 w-full lg:w-auto border border-[#1a2436]">
              SHOW MORE
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 text-sm mt-4">
        <div className="text-[#4A5568] mb-4 sm:mb-0">Viewing 10 to 90 out of 0 items</div>

        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#26DBD6] border border-[#1a2436]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {paginationItems.slice(0, 5).map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === page ? "bg-[#26DBD6] text-[#000B13]" : "text-[#4A5568] hover:text-[#26DBD6]"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <span className="text-[#4A5568]">...</span>

          <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#4A5568] hover:text-[#26DBD6]">
            {totalPages}
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#26DBD6] border border-[#1a2436]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
