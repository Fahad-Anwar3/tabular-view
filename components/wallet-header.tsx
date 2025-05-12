import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function WalletHeader() {
  const walletData = {
    name: "High Accuracy Trader",
    username: "GuiJ_MBjg",
    type: "Copy Trading",
    tags: "High Volume Dex Trader, Popular Wallet",
    balance: "0 SOL",
    ticker: "(SO)",
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 sm:px-6 md:px-0">
      <div className="bg-[#000B13] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:py-10 border-2 sm:border-4 border-[#26DBD6] shadow-[0_0_15px_rgba(0,255,255,0.15)]">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6">
          <div className="space-y-2 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#001726] hover:bg-[#1a2436] shadow-[0_0_15px_rgba(0,255,255,0.30)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="#4A5568"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide truncate">{walletData.name}</h2>
            </div>

            <div className="flex flex-col gap-1 pl-11 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                <div className="text-gray-400">{walletData.username}</div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Image src="/Frame.png" alt="image" width={20} height={20} />
                  {walletData.type}
                </div>
              </div>
              <div className="text-gray-400 truncate max-w-full">Tags: {walletData.tags}</div>
            </div>
          </div>

          <div className="flex items-center bg-[#243142] rounded-lg px-3 py-2 self-start sm:self-auto mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              <Image src="/image.svg" alt="image" width={30} height={30} />
              <div>
                <span className="text-[#4EEBC5] font-medium">Solana</span>
                <div className="text-[#4EEBC5] text-sm">
                  {walletData.balance} <span className="opacity-70">{walletData.ticker}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-6 pl-0 sm:pl-11">
          <button className="bg-[#001726] hover:bg-[#1a2436] text-gray-400 px-3 sm:px-4 py-2 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.30)] text-xs sm:text-sm font-medium transition-colors">
            ADD
          </button>
          <button className="bg-[#001726] hover:bg-[#1a2436] text-gray-400 px-3 sm:px-4 py-2 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.30)] text-xs sm:text-sm font-medium transition-colors">
            RESTORE
          </button>
        </div>

        <button className="w-full bg-[#001726] hover:bg-[#1a2436] text-gray-300 py-2 sm:py-3 rounded-2xl sm:rounded-3xl transition-colors flex items-center shadow-[0_0_15px_rgba(0,255,255,0.30)] justify-center gap-2">
          <span className="font-medium tracking-wider text-sm sm:text-base">SHOW STATS</span>
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}
