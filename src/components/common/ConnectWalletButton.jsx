import "./ConnectWalletButton.css";
import React from "react";

export default function ConnectWalletButton({ imgSrc, children, onClick }) {
  return (
    <button className="connect-wallet-btn" onClick={onClick}>
      {imgSrc && <img className="btn-icon" src={imgSrc} alt="Connect Wallet" />}
      <span className="btn-label">{children}</span>
    </button>
  );
}
