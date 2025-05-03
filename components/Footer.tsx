"use client"

import { FaDiscord, FaTwitter, FaLinkedin, FaTelegram } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-dashboard-header py-8 border-t border-dashboard-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4 mb-8">
          <button className="footer-icon-button">
            <FaDiscord className="text-white" />
          </button>
          <button className="footer-icon-button">
            <FaTwitter className="text-white" />
          </button>
          <button className="footer-icon-button">
            <FaLinkedin className="text-white" />
          </button>
          <button className="footer-icon-button">
            <FaTelegram className="text-white" />
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

        <div className="flex justify-between items-center border-t border-gray-700 pt-4">
          <span className="text-sm text-gray-400">Copyright © 2024 Lorem</span>

          <div className="flex space-x-6">
            <button className="language-button flex items-center">
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
                <path d="M2 12h20"></path>
                <path d="M12 2v20"></path>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"></path>
                <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"></path>
              </svg>
              English
            </button>
            <button className="language-button flex items-center">
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
                <path d="M2 12h20"></path>
                <path d="M12 2v20"></path>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"></path>
                <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"></path>
              </svg>
              Spanish
            </button>
            <button className="language-button flex items-center">
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
                <path d="M2 12h20"></path>
                <path d="M12 2v20"></path>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"></path>
                <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"></path>
              </svg>
              Dutch
            </button>
            <button className="language-button flex items-center">
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
                <path d="M2 12h20"></path>
                <path d="M12 2v20"></path>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"></path>
                <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"></path>
              </svg>
              Indonesian
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
