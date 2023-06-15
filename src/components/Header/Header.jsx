import React, { useEffect, useState } from "react"
import "./Header.css"
import ConnectWalletButton from "../common/ConnectWalletButton"
import connectWalletImg from "../../img/ic_wallet_24.svg"
import VoidExchangeLogo from "@img/logo/void_exchange_logo.svg"
import cx from "classnames"
import { Link, useLocation } from "react-router-dom"
import { CancelIcon } from "@icons/index"

const Header = () => {
  const location = useLocation()
  const [y, setY] = useState(0)
  const [show, setShow] = useState("notShow")

  const showMenu = () => {
    setShow(show === "show" ? "notShow" : "show")
  }

  const handleNavigation = (e) => {
    const window = e.currentTarget
    setY(window.scrollY)
  }

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
          "header flex justify-between items-center w-full text-base z-50": true,
          "border-b": location.pathname === "/trade" ? true : false
        })}
      >
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center">
            <img src={VoidExchangeLogo} alt="Flowbite Logo" />
          </Link>
          <div className="w-full mobile-hidden">
            <ul className="flex menu-item justify-center ml-20 gap-x-10 items-center text-base" id="navbar-default">
              <span className="bg-transparent font-semibold text-sm text-teal-300 hover:text-white py-1 px-4 border border-blue-500 rounded">
                Testnet
              </span>
              <li className="item">
                <Link to={`/vault/list`}>Earn</Link>
              </li>
              <li className="item">
                <Link to={`/`}>Dashboard</Link>
              </li>
              <li className="item">
                <Link to={`/document`}>Docs</Link>
              </li>
              <li className="item">
                <Link to={`/profile`}>Profile</Link>
              </li>
              <li className="item">
                <Link to={`/faucet`}>Faucet</Link>
              </li>
              <li className="item">
                <Link to={`/staking`}>Staking</Link>
              </li>
              <li className="item">
                <Link to={`/market`}>Market</Link>
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
        <div className={`rounded absolute left-0 top-0 w-full z-50 bg-slate-300 ${show} bg-card`}>
          <div className="absolute right-0">
            <img src={CancelIcon} alt="cencel" className="w-10 h-10 cursor-pointer" onClick={showMenu} />
          </div>
          <ul className="py-2 text-sm flex flex-col gap-5 mt-5">
            <li className="item px-3 py-3">
              <Link to={`/vault/list`}>Earn</Link>
            </li>
            <li className="item px-3 py-3">
              <Link to={`/`}>Dashboard</Link>
            </li>
            <li className="item px-3 py-3">
              <Link to={`/document`}>Docs</Link>
            </li>
            <li className="item px-3 py-3">
              <Link to={`/profile`}>Profile</Link>
            </li>
            <li className="item">
              <Link to={`/faucet`}>Faucet</Link>
            </li>
            <li className="item">
              <Link to={`/staking`}>Staking</Link>
            </li>
            <li className="item">
              <Link to={`/market`}>Market</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
