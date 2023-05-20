import React, { useEffect, useState } from "react"
import "./Header.css"
import ConnectWalletButton from "../common/ConnectWalletButton"
import connectWalletImg from "../../img/ic_wallet_24.svg"
import VoidExchangeLogo from "@img/logo/void_exchange_beta.png"
import { useLocation } from "react-router-dom"
import useUserWindow from "../../hooks/useUserWindow"
import { useDisconnect } from "wagmi"
import cx from "classnames"

const Header = () => {
  const { disconnect } = useDisconnect()
  const [y, setY] = useState(0)
  const [show, setShow] = useState("notShow")
  const location = useLocation()

  const showMenu = () => {
    setShow(show === "show" ? "notShow" : "show")
  }

  const handleNavigation = (e) => {
    const window = e.currentTarget
    if (y > window.scrollY) {
      console.log("scrolling up")
    } else if (y < window.scrollY) {
      console.log("scrolling down")
    }
    setY(window.scrollY)
  }
  console.log({ y })

  useEffect(() => {
    setY(window.scrollY)

    window.addEventListener("scroll", (e) => handleNavigation(e))
  }, [])

  return (
    <div
      className={cx({
        "blur-bg sticky": y > 0
      })}
    >
      <header
        className={cx({
          "header flex justify-between items-center  h-16 w-full text-base ": true,
          "border-b border-slate-700": location.pathname === "/" ? false : true
        })}
      >
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={VoidExchangeLogo} height={70} width={200} alt="Flowbite Logo" />
            {/* <span className="self-center font-semibold whitespace-nowrap dark:text-white">Void Exchange</span> */}
          </a>
          <div className="w-full mobile-hidden">
            <ul className="flex menu-item justify-center ml-20 gap-x-10 items-center text-base" id="navbar-default">
              <span className="bg-transparent font-semibold text-sm text-teal-300 hover:text-white py-1 px-4 border border-blue-500 rounded">
                Testnet
              </span>
              <li className="item">
                <a href="/vault">Earn</a>
              </li>
              <li className="item">
                <a href="/">Dashboard</a>
              </li>
              <li className="item">
                <a href="/document">Docs</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex">
          <div className="">
            <ConnectWalletButton imgSrc={connectWalletImg} />
          </div>

          <button
            type="button"
            className="inline-flex items-center p-2 ml-10 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={showMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/* responsive hambuger */}
        <div className={`rounded absolute right-5 top-20 bg-slate-700 ${show}`}>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/Docs"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href="/Trade"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Trade
              </a>
            </li>
            <li
              onClick={() => disconnect()}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Disconnect
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
