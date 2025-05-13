
import TradingStats from "../../../components/ trading-stats"
import AuthButtons from "../../../components/AuthButtons"
import Footer from "../../../components/Footer"
import WalletList from "../../../components/wallet-list"

export default function WalletDetailPage() {
  return (
    <div className="min-h-screen bg-[#0E1621] text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <AuthButtons />
        <TradingStats />

        <div className="mt-8">
          <WalletList />
        </div>
        <Footer />
      </div>
    </div>
  )
}
