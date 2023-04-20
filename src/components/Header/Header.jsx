import React, { useState } from "react";
import "./Header.css";
import ConnectWalletButton from "../common/ConnectWalletButton";
import connectWalletImg from "../../img/ic_wallet_24.svg";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState("notShow");
  const location = useLocation();

  const showMenu = () => {
    setShow(show === "show" ? "notShow" : "show");
  };

  return (
    <header className="header flex justify-between items-center border-b border-gray-700 h-16 w-full">
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center font-semibold whitespace-nowrap dark:text-white">
            ZK Perp
          </span>
        </a>
        <div className="w-full mobile-hidden">
          <ul
            className="flex menu-item justify-center ml-20 gap-x-10 items-center"
            id="navbar-default"
          >
            <li className="item">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="item">
              <a href="/document">Docs</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex gap-x-3">
        <div className="flex gap-x-3">
          <a
            className={
              location.pathname === "/trade"
                ? "default-btn pointer-events-none"
                : "default-btn"
            }
            href="/trade"
          >
            Trade
          </a>
          <ConnectWalletButton imgSrc={connectWalletImg}>
            <div>Connect Wallet</div>
          </ConnectWalletButton>
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
