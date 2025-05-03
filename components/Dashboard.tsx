"use client"

import Header from "./Header"
import StockTable from "./StockTable"
import Footer from "./Footer"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-dashboard-background">
      <Header />
      <main className="flex-1">
        <StockTable />
      </main>
      <Footer />
    </div>
  )
}
