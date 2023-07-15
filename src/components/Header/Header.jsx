import React, { useEffect, useState } from "react"

import { Link, useLocation, useNavigate } from "react-router-dom"
import cx from "classnames"

import ConnectWalletButton from "../common/ConnectWalletButton"
import useOutsideDetect from "src/hooks/useOutsideDetect"
import useUserWindow from "src/hooks/useUserWindow"

import VoidExchangeLogo from "@img/logo/void_exchange_logo.svg"

import "./Header.css"
import { WalletIcon } from "@icons/index"
import { navbar } from "./config"
import Badge from "@components/common/Badge"

const Header = () => {
  const location = useLocation()
  const [y, setY] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const navigate = useNavigate()

  const showMenu = () => {
    setIsShow(!isShow)
  }

  const handleNavigation = (e) => {
    const window = e.currentTarget
    setY(window.scrollY)
  }

  const handleClickOutside = () => {
    setIsShow(false)
  }
  const refOutside = useOutsideDetect(handleClickOutside)

  const { width } = useUserWindow()

  useEffect(() => {
    setY(window.scrollY)

    window.addEventListener("scroll", (e) => handleNavigation(e))
  }, [])

  return (
    <div
      className={cx(
        {
          "blur-bg sticky top-0 w-full ": y > 0
        },
        "vh-7"
      )}
    >
      <header
        className={cx({
          "header flex justify-between items-center w-full h-full z-50 relative lg:text-sm xl:text-base px-5 2xl:px-10 3xl:px-28 py-1": true,
          "border-b": location.pathname === "/trade" ? true : false
        })}
        ref={refOutside}
      >
        <div className="flex items-center gap-0 xl:gap-3 2xl:gap-5 3xl:gap-10">
          <div className="w-40 cursor-pointer" onClick={() => navigate("/")}>
            <img src={VoidExchangeLogo} alt="Logo" className="h-auto object-cover w-full" />
          </div>
          <div className={cx("navbar", { show: isShow })}>
            <ul className="xl:flex items-center gap-1 xl:gap-5 2xl:gap-8 3xl:gap-12">
              <li className="bg-transparent font-semibold text-sm text-teal-300 hover:text-white py-1 px-4 border border-blue-500 rounded">
                Testnet
              </li>
              {navbar.map((item, idx) => (
                <li
                  className={cx("item", {
                    border: false,
                    "active-link font-medium": location.pathname === item.link,
                    hidden: item.hidden
                  })}
                  key={idx}
                >
                  <Link to={item.link} onClick={showMenu}>
                    <span>{item.title}</span>
                    {item.bagde && <Badge text={item.bagde} />}
                  </Link>
                </li>
              ))}
              {width <= 1024 && <ConnectWalletButton imgSrc={WalletIcon} />}
            </ul>
          </div>
        </div>

        <div className="flex">
          {width > 1024 && <ConnectWalletButton imgSrc={WalletIcon} />}
          <button type="button" onClick={showMenu} className="hamburgur-icon ml-3">
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
      </header>
    </div>
  )
}

export default Header
