"use client"

import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#0E1621] py-8 border-t border-dashboard-border">
      <div className="container mx-auto px-4">
        <div className="flex mx-10 justify-evenly my-20">
          <div className="flex justify-center space-x-4 mb-8 mr-16">
            <button className="footer-icon-button">
              <Image src="/discode.png" alt="ok" width={32} height={32} />
            </button>
            <button className="footer-icon-button">
              <Image src="/youtube.png" alt="ok" width={32} height={32} />
            </button>
            <button className="footer-icon-button">
              <Image src="/linkedin.png" alt="ok" width={32} height={32} />
            </button>
            <button className="footer-icon-button">
              <Image src="/fly.png" alt="ok" width={32} height={32} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="footer-heading">Alpha Community</h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="footer-link">
                  Alpha Trades
                </a>
              </div>
            </div>

            <div>
              <h3 className="footer-heading">Alpha Tools</h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="footer-link">
                  Alpha Hunter
                </a>
                <a href="#" className="footer-link">
                  Alpha Alerts
                </a>
              </div>
            </div>

            <div>
              <h3 className="footer-heading">Alpha Analysis</h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="footer-link">
                  Simple
                </a>
                <a href="#" className="footer-link">
                  Dashboard
                </a>
                <a href="#" className="footer-link">
                  Advanced
                </a>
                <a href="#" className="footer-link">
                  Listing
                </a>
              </div>
            </div>

            <div>
              <h3 className="footer-heading">Crypto and NFT Trading Course</h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="footer-link">
                  Pricing
                </a>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-[#4D9CD0] pt-4">
          <span className="text-sm text-gray-400">Copyright © 2024 Lorem</span>

          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-full border border-[#26dbd6] bg-transparent text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              English
            </button>
            <button className="px-4 py-2 rounded-full border border-[#1e3a5f] bg-transparent text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Spanish
            </button>
            <button className="px-4 py-2 rounded-full border border-[#1e3a5f] bg-transparent text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dutch
            </button>
            <button className="px-4 py-2 rounded-full border border-[#1e3a5f] bg-transparent text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Indonesian
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
