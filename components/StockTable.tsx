// "use client"

// import type React from "react"
// import { useEffect, useState, useRef, memo } from "react"
// import { ChevronDown, ChevronUp } from "lucide-react"
// import { stockData } from "../data/stockData"
// import Image from "next/image"
// import FilterDropdown from "./FilterDropdown"

// type StockData = {
//   id: number
//   symbol: string
//   company: string
//   chg: number
//   chgPercent: number
//   technicalRating1: string
//   technicalRating2: string
//   volume: string
//   volumePrice: string
//   mktCap: string
//   pe: string
//   eps: string
//   sector: string
// }

// const TableRow = memo(({ row, index }: { row: StockData; index: number }) => {
//   const getValueClass = (value: number) => {
//     if (value > 0) return "text-[#1eb980]"
//     if (value < 0) return "text-[#ff5252]"
//     return "text-gray-400"
//   }

//   const getRatingClass = (rating: string) => {
//     if (rating === "Strong Buy") return "text-[#1eb980] flex items-center"
//     if (rating === "Buy") return "text-[#4caf50] flex items-center"
//     if (rating === "Strong Sell") return "text-[#ff5252] flex items-center"
//     if (rating === "Sell") return "text-[#f44336] flex items-center"
//     return "text-gray-400 flex items-center"
//   }

//   const renderRatingIcon = (rating: string) => {
//     if (rating.includes("Buy")) {
//       return <ChevronUp className="h-4 w-4 mr-1" />
//     } else if (rating.includes("Sell")) {
//       return <ChevronDown className="h-4 w-4 mr-1" />
//     } else {
//       return <span className="h-4 w-4 mr-1 inline-block">—</span>
//     }
//   }

//   return (
//     <tr className={`border-b border-[#1e3a5f] ${index % 2 === 1 ? "bg-[#0c1e33]" : "bg-[#0a1929]"} hover:bg-[#1e3a5f]`}>
//       <td className="py-3 px-2 md:px-4">
//         <div className="flex items-center ">
//           <Image alt="n" src="/nvidia 1.png" width={30} height={30}></Image>
//           <span className="font-medium text-sm md:text-base pl-2">{row.symbol}</span>
//         </div>
//       </td>
//       <td className="py-3 px-2 md:px-4 text-gray-300 text-sm md:text-base">{row.company}</td>
//       <td className={`py-3 px-2 md:px-4 ${getValueClass(row.chgPercent)} text-sm md:text-base`}>
//         <div className="flex items-center">
//           {row.chgPercent > 0 ? (
//             <><ChevronUp className="h-4 w-4 mr-1" />{row.chgPercent.toFixed(2)}%</>
//           ) : (
//             <><ChevronDown className="h-4 w-4 mr-1" />{Math.abs(row.chgPercent).toFixed(2)}%</>
//           )}
//         </div>
//       </td>
//       <td className={`py-3 px-2 md:px-4 ${getValueClass(row.chg)} text-sm md:text-base`}>
//         <div className="flex items-center">
//           {row.chg > 0 ? (
//             <><ChevronUp className="h-4 w-4 mr-1" />{row.chg.toFixed(2)}$</>
//           ) : (
//             <><ChevronDown className="h-4 w-4 mr-1" />{Math.abs(row.chg).toFixed(2)}$</>
//           )}
//         </div>
//       </td>
//       {['technicalRating1', 'technicalRating2', 'volume', 'volumePrice', 'mktCap', 'pe', 'eps', 'sector'].map((field, i) => (
//         <td
//           key={i}
//           className="py-3 px-2 md:px-4 text-sm md:text-base hidden sm:table-cell"
//         >
//           {field.includes('technicalRating') ? (
//             <div className={getRatingClass(row[field as keyof StockData] as string)}>
//               {renderRatingIcon(row[field as keyof StockData] as string)}
//               {row[field as keyof StockData]}
//             </div>
//           ) : (
//             <div className="flex items-center">{row[field as keyof StockData]}</div>
//           )}
//         </td>
//       ))}
//     </tr>
//   )
// })
// TableRow.displayName = "TableRow"

// export default function StockTable() {
//   const [data, setData] = useState<StockData[]>([])
//   const [activeFilter, setActiveFilter] = useState<string | null>(null)
//   const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 })
//   const tableRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     setData(stockData)

//     const handleClickOutside = (event: MouseEvent) => {
//       if (activeFilter && tableRef.current && !tableRef.current.contains(event.target as Node)) {
//         setActiveFilter(null)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [activeFilter])

//   const handleFilterClick = (e: React.MouseEvent, column: string) => {
//     e.stopPropagation()
//     const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
//     const scrollTop = window.scrollY || document.documentElement.scrollTop

//     setFilterPosition({
//       top: rect.bottom + scrollTop,
//       left: rect.left,
//     })

//     setActiveFilter(activeFilter === column ? null : column)
//   }

//   const headers = [
//     { key: "symbol", label: "Symbol" },
//     { key: "company", label: "Company" },
//     { key: "chgPercent", label: "CHG%" },
//     { key: "chg", label: "CHG" },
//     { key: "technicalRating1", label: "Technical Rating" },
//     { key: "technicalRating2", label: "Technical Rating" },
//     { key: "volume", label: "VOL" },
//     { key: "volumePrice", label: "Volume/Price" },
//     { key: "mktCap", label: "MKT CAP" },
//     { key: "pe", label: "P/E" },
//     { key: "eps", label: "EPS (TTM)" },
//     { key: "sector", label: "SECTOR" },
//   ]

//   return (
//     <div className="bg-[#000B13] border border-[#1e3a5f] rounded-none overflow-hidden relative" ref={tableRef}>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-[#000B13] border-b border-[#1e3a5f]">
//               {headers.map((col) => (
//                 <th
//                   key={col.key}
//                   className={`py-2 md:py-3 px-2 md:px-4 text-left text-[#26dbd6] font-medium text-xs uppercase ${col.key !== 'symbol' && col.key !== 'company' && col.key !== 'chgPercent' && col.key !== 'chg' ? 'hidden sm:table-cell' : ''}`}
//                 >
//                   <div className="flex items-center justify-between">
//                     {col.label}
//                     {["company", "chgPercent", "chg", "volume", "volumePrice", "sector"].includes(col.key) && (
//                       <div
//                         className="w-6 h-6 flex items-center justify-center ml-2 cursor-pointer"
//                         onClick={(e) => handleFilterClick(e, col.key)}
//                       >
//                         <Image src="/filter.svg" alt="filter" width={24} height={24} className="opacity-70" />
//                       </div>
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <TableRow key={row.id} row={row} index={index} />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {activeFilter && (
//         <FilterDropdown column={activeFilter} onClose={() => setActiveFilter(null)} position={filterPosition} />
//       )}
//     </div>
//   )
// }
