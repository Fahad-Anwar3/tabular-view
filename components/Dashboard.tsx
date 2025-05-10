"use client"

import Header from "./Header"
import Footer from "./Footer"
import AuthButtons from "./AuthButtons"
import VirtualizedTable from "./VirtualizedTable"

export default function Dashboard() {
  return (
    <>    
    <AuthButtons />
    <div className="flex flex-col min-h-screen bg-dashboard-background relative">
      <Header />
      <main className="flex-1 overflow-x-auto">
        <VirtualizedTable />
      </main>
      <Footer />
    </div>
    </>

  )
}
