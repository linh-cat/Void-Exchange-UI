import React from "react";
import "./Header.css";
import ConnectWalletButton from "../common/ConnectWalletButton";
import connectWalletImg from "../../img/ic_wallet_24.svg";

const Header = () => {
  return (
    <header className="header border-b border-gray-700">
      <div className="header-left flex justify-center">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center font-semibold whitespace-nowrap dark:text-white">
            ZK Perp
          </span>
        </a>
        <ul className="menu-item flex justify-center ml-20 gap-x-10 items-center">
          <li className="item">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="item">
            <a href="/document">Docs</a>
          </li>
        </ul>
      </div>
      <div className="header-right flex gap-x-5">
        <button className="default-btn">Trade</button>
        <ConnectWalletButton imgSrc={connectWalletImg}>
          <div>Connect Wallet</div>
        </ConnectWalletButton>
      </div>
    </header>
  );
};

export default Header;
