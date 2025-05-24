"use client"

import { useState } from "react"
import Image from "next/image"

export default function PortfolioTable() {
  

  // Static data for portfolio tokens
  const portfolioTokens = [
    {
      id: 1,
      name: "Pippin",
      icon: "LAY",
      blockchain: "Solana",
      amount: "1.33k pip/pin",
      percentage: "0.00%",
      price: "$19.275",
      usdValue: "$25,698.58",
    },
    {
      id: 2,
      name: "Pippin",
      icon: "LAY",
      blockchain: "Solana",
      amount: "1.33k pip/pin",
      percentage: "0.00%",
      price: "$19.275",
      usdValue: "$25,698.58",
    },
    {
      id: 3,
      name: "Pippin",
      icon: "LAY",
      blockchain: "Solana",
      amount: "1.33k pip/pin",
      percentage: "0.00%",
      price: "$19.275",
      usdValue: "$25,698.58",
    },
    {
      id: 4,
      name: "Pippin",
      icon: "LAY",
      blockchain: "Solana",
      amount: "1.33k pip/pin",
      percentage: "0.00%",
      price: "$19.275",
      usdValue: "$25,698.58",
    },
    {
      id: 5,
      name: "Pippin",
      icon: "LAY",
      blockchain: "Solana",
      amount: "1.33k pip/pin",
      percentage: "0.00%",
      price: "$19.275",
      usdValue: "$25,698.58",
    },
    {
      id: 6,
      name: "Pippin",
      icon: "LAY",
      blockchain: "Solana",
      amount: "1.33k pip/pin",
      percentage: "0.00%",
      price: "$19.275",
      usdValue: "$25,698.58",
    },
    {
      id: 7,
      name: "Pippin",
      icon: "LAY",
      blockchain: "Solana",
      amount: "1.33k pip/pin",
      percentage: "0.00%",
      price: "$19.275",
      usdValue: "$25,698.58",
    },
    {
      id: 8,
      name: "Pippin",
      icon: "LAY",
      blockchain: "Solana",
      amount: "1.33k pip/pin",
      percentage: "0.00%",
      price: "$19.275",
      usdValue: "$25,698.58",
    },
  ]

  return (
    <div className="bg-[#000B13] rounded-xl border border-[#284c8f] overflow-hidden p-2 sm:p-4">
     

      {/* Table Headers - Desktop */}
      <div className="hidden md:grid grid-cols-4 gap-2 sm:gap-4 mb-2 sm:mb-4 text-[#26DBD6] text-xs font-bold px-2 sm:px-4 uppercase">
        <div>Token</div>
        <div className="text-center">Amount Held</div>
        <div className="text-center">Price</div>
        <div className="text-center">USD Value</div>
      </div>

      {/* Table Headers - Mobile */}
      <div className="md:hidden grid grid-cols-1 gap-2 mb-2 text-[#26DBD6] text-xs font-bold px-2 uppercase">
        <div>Token</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2 sm:space-y-4">
        {portfolioTokens.map((token) => (
          <div key={token.id} className="bg-[#001422] rounded-xl p-3 sm:p-4">
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#1a2436] rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center text-white text-xs sm:text-sm">
                  {token.icon}
                </div>
                <div>
                  <div className="text-white text-sm sm:text-base">{token.name}</div>
                  <div className="flex items-center">
                    <Image src="/image.svg" alt="blockchain" width={14} height={14} className="mr-1" />
                    <span className="text-[#26DBD6] text-xs">{token.blockchain}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
                <div>
                  <div className="text-[#4A5568] text-[10px] sm:text-xs">Amount Held</div>
                  <div className="text-white">{token.amount}</div>
                  <div className="text-[#4A5568] text-[10px]">{token.percentage}</div>
                </div>

                <div>
                  <div className="text-[#4A5568] text-[10px] sm:text-xs">Price</div>
                  <div className="text-white">{token.price}</div>
                </div>

                <div className="col-span-2 mt-1">
                  <div className="text-[#4A5568] text-[10px] sm:text-xs">USD Value</div>
                  <div className="text-white font-medium">{token.usdValue}</div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-4 items-center">
              <div className="flex items-center gap-3">
                <div className="bg-[#1a2436] rounded-full h-10 w-10 flex items-center justify-center text-white">
                  {token.icon}
                </div>
                <div>
                  <div className="text-white">{token.name}</div>
                  <div className="flex items-center">
                    <Image src="/image.svg" alt="blockchain" width={16} height={16} className="mr-1" />
                    <span className="text-[#26DBD6] text-xs">{token.blockchain}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-white">{token.amount}</div>
                <div className="text-[#4A5568] text-xs">{token.percentage}</div>
              </div>

              <div className="text-center">
                <div className="text-white">{token.price}</div>
              </div>

              <div className="text-center">
                <div className="text-white">{token.usdValue}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4 text-xs sm:text-sm mt-4">
        <div className="text-[#4A5568] mb-4 sm:mb-0 text-center sm:text-left">Viewing 10 to 90 out of 0 items</div>

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
