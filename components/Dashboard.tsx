"use client"

import Header from "./Header"
import StockTable from "./StockTable"
import Footer from "./Footer"
import { Topbar } from "./topbar"

export default function Dashboard() {
  return (
    <>
    <Topbar />
      <div className="flex flex-col min-h-screen bg-dashboard-background">
      <Header />
      <main className="flex-1 overflow-x-auto">
        <StockTable />
      </main>
      <Footer />
    </div>
    </>
  )
}
