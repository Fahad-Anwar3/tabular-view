import { ChevronUpIcon, CopyIcon } from "lucide-react"
import Image from "next/image"

export default function TradingStats() {
  // Static data for trading statistics
  const statsData = {
    wallet: {
      address: "2zBoK...CMg",
      fullAddress: "2zBoKrC3A7MzNpv7hozAe4v7FvXSXSvLmBCMg",
      blockchain: "Solana",
      protocol: "GMX V2, GMX V1",
      market: "SPOT",
      runtime: "207 Days",
      tradeDuration: "5 Days",
    },
    tradeStats: {
      date: "11/29/2024",
      totalVolume: "28",
      avgVolume: "8",
      maxWinPerc: "36.00%",
      maxLossPerc: "-13.00%",
      avgWinPerc: "23.00%",
      avgLossPerc: "-5.00%",
      avgROI: "81.33%",
    },
    tradingPerformance: {
      trades: "3k",
      tokensTraded: "3k",
      wins: "28",
      losses: "8",
      winRate: "81.33%",
    },
    pnlOverview: {
      unrealizedPnl: "$3,402.00",
      unrealizedPerc: "3700.00%",
      realizedPnl: "$22,091.00",
      realizedPerc: "34700%",
      totalGain: "28",
      totalLoss: "8",
      profitRatePerc: "81.33%",
    },
    riskMetrics: {
      maxDrawdown: "-10.42%",
      maxRuin: "37.00%",
      riskReward: "37.00%",
    },
    tradingBehavior: {
      date: "11/29/2024",
      avgLeverage: "28",
    },
  }

  return (
    <div className="bg-[#000B13] rounded-xl border-2 border-[#0071BC] overflow-hidden">
      {/* Wallet Info Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-[#1a2436]">
        <div className="items-center gap-2 mb-4 md:mb-0 w-full md:w-auto">
          <div className="text-white font-medium">{statsData.wallet.address}</div>
          <div className="flex items-center justify-between md:justify-start">
            <div className="text-[#4A5568] text-xs truncate max-w-[200px] md:max-w-none">
              {statsData.wallet.fullAddress}
            </div>
            <div className="text-[#26DBD6] pl-4 cursor-pointer">
              <CopyIcon className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between w-full md:w-auto md:justify-end gap-4 md:gap-8">
          <div className="text-center">
            <div className="text-xs text-[#4A5568] mb-1">Blockchain</div>
            <div className="flex items-center justify-center">
              <Image src="/image.svg" alt="image" width={20} height={20} />
              <span className="text-sm text-[#26DBD6] pl-2">{statsData.wallet.blockchain}</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-[#4A5568] mb-1">Protocol</div>
            <div className="text-sm text-white">{statsData.wallet.protocol}</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-[#4A5568] mb-1">Market</div>
            <div className="text-sm text-white">{statsData.wallet.market}</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-[#4A5568] mb-1">Runtime</div>
            <div className="text-sm text-white">{statsData.wallet.runtime}</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-[#4A5568] mb-1">Average Trade Duration</div>
            <div className="text-sm text-white">{statsData.wallet.tradeDuration}</div>
          </div>

          <button className="bg-[#001726] hover:bg-[#1a2436] flex items-center gap-1 text-gray-400 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.30)] text-sm font-medium transition-colors">
            Show Less <ChevronUpIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-[#1a2436]">
        {/* Trade Stats */}
        <div className="p-5">
          <h3 className="text-[#26DBD6] font-medium mb-6">Trade Stats</h3>

          <div className="pb-4 border-b border-[#1a2436]">
            <div className="text-[#0ABA6E] text-lg font-medium">{statsData.tradeStats.date}</div>
            <div className="text-[#4A5568] text-xs">Last Trade Date</div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#1a2436]">
            <div>
              <div className="text-white text-lg font-medium">{statsData.tradeStats.totalVolume}</div>
              <div className="text-[#4A5568] text-xs">Total Volume</div>
            </div>
            <div>
              <div className="text-white text-lg font-medium">{statsData.tradeStats.avgVolume}</div>
              <div className="text-[#4A5568] text-xs">Average Volume</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#1a2436]">
            <div>
              <div className="text-[#0ABA6E] text-lg font-medium">{statsData.tradeStats.maxWinPerc}</div>
              <div className="text-[#4A5568] text-xs">Max Win %</div>
            </div>
            <div>
              <div className="text-[#FF4D6D] text-lg font-medium">{statsData.tradeStats.maxLossPerc}</div>
              <div className="text-[#4A5568] text-xs">Max Loss %</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#1a2436]">
            <div>
              <div className="text-[#0ABA6E] text-lg font-medium">{statsData.tradeStats.avgWinPerc}</div>
              <div className="text-[#4A5568] text-xs">Average Win %</div>
            </div>
            <div>
              <div className="text-[#FF4D6D] text-lg font-medium">{statsData.tradeStats.avgLossPerc}</div>
              <div className="text-[#4A5568] text-xs">Average Loss %</div>
            </div>
          </div>

          <div className="pt-4">
            <div className="text-[#0ABA6E] text-lg font-medium">{statsData.tradeStats.avgROI}</div>
            <div className="text-[#4A5568] text-xs">Average ROI</div>
          </div>
        </div>

        {/* Trading Performance */}
        <div className="p-5">
          <h3 className="text-[#26DBD6] font-medium mb-6">Trading Performance</h3>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#1a2436]">
            <div>
              <div className="text-white text-lg font-medium">{statsData.tradingPerformance.trades}</div>
              <div className="text-[#4A5568] text-xs"># of Trades</div>
            </div>
            <div>
              <div className="text-white text-lg font-medium">{statsData.tradingPerformance.tokensTraded}</div>
              <div className="text-[#4A5568] text-xs"># of Tokens Traded</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#1a2436]">
            <div>
              <div className="text-white text-lg font-medium">{statsData.tradingPerformance.wins}</div>
              <div className="text-[#4A5568] text-xs"># of Wins</div>
            </div>
            <div>
              <div className="text-white text-lg font-medium">{statsData.tradingPerformance.losses}</div>
              <div className="text-[#4A5568] text-xs"># of Losses</div>
            </div>
          </div>

          <div className="pt-4">
            <div className="text-[#0ABA6E] text-lg font-medium">{statsData.tradingPerformance.winRate}</div>
            <div className="text-[#4A5568] text-xs">Winning %</div>
          </div>
        </div>

        {/* PnL Overview */}
        <div className="p-5">
          <h3 className="text-[#26DBD6] font-medium mb-6">PnL Overview</h3>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#1a2436]">
            <div>
              <div className="text-white text-lg font-medium">{statsData.pnlOverview.unrealizedPnl}</div>
              <div className="text-[#4A5568] text-xs">Unrealized PnL</div>
            </div>
            <div>
              <div className="text-[#0ABA6E] text-lg font-medium">{statsData.pnlOverview.unrealizedPerc}</div>
              <div className="text-[#4A5568] text-xs"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#1a2436]">
            <div>
              <div className="text-white text-lg font-medium">{statsData.pnlOverview.realizedPnl}</div>
              <div className="text-[#4A5568] text-xs">Realized PnL</div>
            </div>
            <div>
              <div className="text-[#0ABA6E] text-lg font-medium">{statsData.pnlOverview.realizedPerc}</div>
              <div className="text-[#4A5568] text-xs"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#1a2436]">
            <div>
              <div className="text-white text-lg font-medium">{statsData.pnlOverview.totalGain}</div>
              <div className="text-[#4A5568] text-xs">Total Gain</div>
            </div>
            <div>
              <div className="text-white text-lg font-medium">{statsData.pnlOverview.totalLoss}</div>
              <div className="text-[#4A5568] text-xs">Total Loss</div>
            </div>
          </div>

          <div className="pt-4">
            <div className="text-[#0ABA6E] text-lg font-medium">{statsData.pnlOverview.profitRatePerc}</div>
            <div className="text-[#4A5568] text-xs">Profit Rate %</div>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="p-5">
          <h3 className="text-[#26DBD6] font-medium mb-6">Risk Metrics</h3>

          <div className="pb-4 border-b border-[#1a2436]">
            <div className="text-[#FF4D6D] text-lg font-medium">{statsData.riskMetrics.maxDrawdown}</div>
            <div className="text-[#4A5568] text-xs">Max Drawdown</div>
          </div>

          <div className="py-4 border-b border-[#1a2436]">
            <div className="text-white text-lg font-medium">{statsData.riskMetrics.maxRuin}</div>
            <div className="text-[#4A5568] text-xs">Max Ruin</div>
          </div>

          <div className="pt-4">
            <div className="text-white text-lg font-medium">{statsData.riskMetrics.riskReward}</div>
            <div className="text-[#4A5568] text-xs">Risk Reward</div>
          </div>
        </div>

        {/* Trading Behavior */}
        <div className="p-5">
          <h3 className="text-[#26DBD6] font-medium mb-6">Trading Behavior</h3>

          <div className="pb-4 border-b border-[#1a2436]">
            <div className="text-[#0ABA6E] text-lg font-medium">{statsData.tradingBehavior.date}</div>
            <div className="text-[#4A5568] text-xs">Longest Hold</div>
          </div>

          <div className="pt-4">
            <div className="text-white text-lg font-medium">{statsData.tradingBehavior.avgLeverage}</div>
            <div className="text-[#4A5568] text-xs">Average Leverage</div>
          </div>
        </div>
      </div>
    </div>
  )
}
