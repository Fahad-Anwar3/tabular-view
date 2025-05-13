"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import Image from "next/image"

export default function AllTransactionsTable() {
  const [expandedTraders, setExpandedTraders] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Static data for all transactions
  const traders = [
    {
      id: 1,
      name: "High Accuracy Trader",
      username: "GuiJ_MBjg",
      transactions: [
        {
          id: 101,
          type: "Gasless Interaction",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
        {
          id: 102,
          type: "Receive",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
        {
          id: 103,
          type: "Send",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
      ],
    },
    {
      id: 2,
      name: "High Accuracy Trader",
      username: "GuiJ_MBjg",
      transactions: [
        {
          id: 201,
          type: "Gasless Interaction",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
        {
          id: 202,
          type: "Receive",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
        {
          id: 203,
          type: "Swap Buy",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
        {
          id: 204,
          type: "Receive",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
        {
          id: 205,
          type: "Send",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
      ],
    },
    {
      id: 3,
      name: "High Accuracy Trader",
      username: "GuiJ_MBjg",
      transactions: [
        {
          id: 301,
          type: "Gasless Interaction",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
        {
          id: 302,
          type: "Receive",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
        {
          id: 303,
          type: "Send",
          amount: "0.001 JUP",
          from: "xczb...7y3h",
          date: "05 Mar 2025, 17:21",
          value: "1.4k spl",
        },
      ],
    },
  ]

  const toggleTrader = (id: number) => {
    if (expandedTraders.includes(id)) {
      setExpandedTraders(expandedTraders.filter((traderId) => traderId !== id))
    } else {
      setExpandedTraders([...expandedTraders, id])
    }
  }

  return (
    <div className="bg-[#000B13] rounded-xl border border-[#284c8f] overflow-hidden p-2 sm:p-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-[#001422] text-gray-100 text-sm px-3 py-2 w-full rounded-xl border border-[#243142] flex items-center justify-between"
        >
          <span>Filters</span>
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Filter Buttons */}
      <div className={`${showFilters ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-2 mb-4 md:mb-6`}>
        <button className="bg-[#001422] text-gray-100 text-xs sm:text-sm px-3 py-2 rounded-xl border border-[#243142] flex items-center justify-between md:w-auto w-full">
          <span>Chains</span> <ChevronDown className="h-4 w-4 ml-1" />
        </button>
        <button className="bg-[#001422] text-gray-100 text-xs sm:text-sm px-3 py-2 rounded-xl border border-[#243142] flex items-center justify-between md:w-auto w-full">
          <span>Transaction Type</span> <ChevronDown className="h-4 w-4 ml-1" />
        </button>
        <button className="bg-[#001422] text-gray-100 text-xs sm:text-sm px-3 py-2 rounded-xl border border-[#243142] flex items-center justify-between md:w-auto w-full">
          <span>Tokens/NFTs</span> <ChevronDown className="h-4 w-4 ml-1" />
        </button>
        <button className="bg-[#001422] text-gray-100 text-xs sm:text-sm px-3 py-2 rounded-xl border border-[#243142] flex items-center justify-between md:w-auto w-full">
          <span>USD range</span> <ChevronDown className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* Transactions */}
      <div className="space-y-2 sm:space-y-4">
        {traders.map((trader) => (
          <div key={trader.id} className="bg-[#001422] rounded-xl overflow-hidden">
            <div
              className="p-3 sm:p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleTrader(trader.id)}
            >
              <div>
                <div className="text-white font-medium text-sm sm:text-base">{trader.name}</div>
                <div className="text-[#4A5568] text-xs">{trader.username}</div>
              </div>
              <button className="text-[#4A5568]">
                {expandedTraders.includes(trader.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>

            {expandedTraders.includes(trader.id) && (
              <div className="border-t border-[#1a2436]">
                {trader.transactions.map((tx) => (
                  <div key={tx.id} className="p-3 sm:p-4 border-b border-[#1a2436] last:border-b-0">
                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-3 items-center">
                      {/* Left column - Transaction type */}
                      <div className="flex justify-start">
                        <div className="bg-[#192B38] text-gray-400 text-sm px-3 py-1 rounded-full">{tx.type}</div>
                      </div>

                      {/* Middle column - Transaction details */}
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <Image src="/bitcoin.png" alt="token" width={40} height={40} className="rounded-full" />
                          <div className="text-white text-sm">
                            Received {tx.amount} from <span className="text-[#4887f5]">{tx.from}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right column - Value and date */}
                      <div className="flex items-center justify-end gap-4">
                        <div className="text-white text-sm">{tx.value}</div>
                        <div className="text-[#4A5568] text-xs">{tx.date}</div>
                        <Image src="/bitcoin.png" alt="token" width={40} height={40} className="rounded-full" />
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-3">
                      {/* Transaction type */}
                      <div className="flex justify-start">
                        <div className="bg-[#192B38] text-gray-400 text-xs px-2 py-1 rounded-full">{tx.type}</div>
                      </div>

                      {/* Transaction details */}
                      <div className="flex items-center gap-2">
                        <Image src="/bitcoin.png" alt="token" width={32} height={32} className="rounded-full" />
                        <div className="text-white text-xs">
                          Received {tx.amount} from <span className="text-[#4887f5]">{tx.from}</span>
                        </div>
                      </div>

                      {/* Value and date */}
                      <div className="flex items-center justify-between">
                        <div className="text-white text-xs">{tx.value}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-[#4A5568] text-[10px]">{tx.date}</div>
                          <Image src="/bitcoin.png" alt="token" width={24} height={24} className="rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="text-center text-[#4A5568] text-xs sm:text-sm py-3 sm:py-4">
          There are no more items to show
        </div>
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
