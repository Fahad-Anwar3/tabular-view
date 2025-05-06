"use client"

import Header from "./Header"
import StockTable from "./StockTable"
import Footer from "./Footer"
import AuthButtons from "./AuthButtons"

export default function Dashboard() {
  return (
    <>    
    <AuthButtons />
    <div className="flex flex-col min-h-screen bg-dashboard-background relative">
      <Header />
      <main className="flex-1 overflow-x-auto">
        <StockTable />
      </main>
      <Footer />
    </div>
    </>

  )
}
