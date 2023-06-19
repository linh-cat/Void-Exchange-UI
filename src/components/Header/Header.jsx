import React, { useEffect, useState } from "react"
import "./Header.css"
import ConnectWalletButton from "../common/ConnectWalletButton"
import connectWalletImg from "../../img/ic_wallet_24.svg"
import VoidExchangeLogo from "@img/logo/void_exchange_logo.svg"
import cx from "classnames"
import { Link, useLocation } from "react-router-dom"
import useOutsideDetect from "src/hooks/useOutsideDetect"
import useUserWindow from "src/hooks/useUserWindow"

const Header = () => {
  const location = useLocation()
  const [y, setY] = useState(0)
  const [isShow, setIsShow] = useState(false)

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
      className={cx({
        "blur-bg sticky": y > 0
      })}
    >
      <header
        className={cx({
          "header flex justify-between lg:justify-around items-center w-full z-50 relative lg:text-sm xl:text-base px-3 py-1": true,
          "border-b": location.pathname === "/trade" ? true : false
        })}
        ref={refOutside}
      >
        <div className="flex items-center xl:gap-36">
          <Link to={"/"} className="flex items-center logo">
            <img src={VoidExchangeLogo} alt="Logo" />
          </Link>
          <div className={cx("navbar", { show: isShow })}>
            <ul className="lg:flex items-center gap-6">
              <li className="bg-transparent font-semibold text-sm text-teal-300 hover:text-white py-1 px-4 border border-blue-500 rounded">
                Testnet
              </li>
              <li
                className={cx("item", {
                  border: false
                })}
              >
                <Link to={`/vault/list`} onClick={showMenu}>
                  Earn
                </Link>
              </li>
              <li
                className={cx("item", {
                  border: false,
                  "active-link font-medium": location.pathname === "/"
                })}
              >
                <Link to={`/`} onClick={showMenu}>
                  Dashboard
                </Link>
              </li>
              <li
                className={cx("item", {
                  border: false,
                  "active-link font-medium": location.pathname === "/document"
                })}
              >
                <Link to={`/document`} onClick={showMenu}>
                  Docs
                </Link>
              </li>
              <li
                className={cx("item", {
                  border: false,
                  "active-link font-medium": location.pathname === "/profile"
                })}
              >
                <Link to={`/profile`} onClick={showMenu}>
                  Profile
                </Link>
              </li>
              <li
                className={cx("item", {
                  border: false,
                  "active-link font-medium": location.pathname === "/faucet"
                })}
              >
                <Link to={`/faucet`} onClick={showMenu}>
                  Faucet
                </Link>
              </li>
              <li
                className={cx("item", {
                  border: false,
                  "active-link font-medium": location.pathname === "/staking"
                })}
              >
                <Link to={`/staking`} onClick={showMenu}>
                  Staking
                </Link>
              </li>
              <li
                className={cx("item", {
                  border: false,
                  "active-link font-medium": location.pathname === "/market"
                })}
              >
                <Link to={`/market`} onClick={showMenu}>
                  Market
                </Link>
              </li>
              {width <= 1024 && <ConnectWalletButton imgSrc={connectWalletImg} />}
            </ul>
          </div>
        </div>

        <div className="flex">
          {width > 1024 && <ConnectWalletButton imgSrc={connectWalletImg} />}
          <button type="button" onClick={showMenu} className="hamburgur-icon">
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
