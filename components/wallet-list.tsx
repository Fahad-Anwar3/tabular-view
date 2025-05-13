"use client"

import { useState } from "react"
import AllTransactionsTable from "./all-transactions-table"
import PortfolioTable from "./ portfolio-table"
import TokenPnLTable from "./token-pnl-table"
import RelatedWalletsTable from "./related-wallets-table"


export default function WalletList() {
  const [activeTab, setActiveTab] = useState("Portfolio")

  // Tab options
  const tabs = ["All", "Portfolio", "Token PnL", "Related Wallets"]

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

      {/* Tab Content */}
      {activeTab === "All" && <AllTransactionsTable />}
      {activeTab === "Portfolio" && <PortfolioTable />}
      {activeTab === "Token PnL" && <TokenPnLTable />}
      {activeTab === "Related Wallets" && <RelatedWalletsTable />}
    </div>
  )
}
