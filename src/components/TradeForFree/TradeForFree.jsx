import React from "react"
import "./TradeForFree.css"
import TradingIMG from "@img/trade-img.png"
import Button from "@components/Button/Button"
const TradeForFree = () => {
  return (
    <section className="trade-for-free mt-10">
      <div className="top text-center flex flex-col gap-3">
        <p className="text-slate-500 uppercase font-medium text-sm tracking-wider">Now Live</p>
        <h3 className="font-medium text-2xl">Start Trading</h3>
        <p className="text-sm">We are continuously launching new Perpetual Contract markets.</p>
      </div>
      <div className="xl:grid xl:grid-flow-col xl:grid-cols-3 xl:mt-10 xl:px-20 overflow-hidden">
        <div className="left-side p-20 col-span-1">
          <h1 className="font-medium text-3xl">What is Decentralized Trading?</h1>
          <p className=" mt-5 text-slate-200">
            Decentralized trading is a new way of trading cryptocurrencies that offers a number of benefits over
            traditional centralized exchanges. It is more secure, transparent, and low-fee, and it gives users more
            control over their funds. As the world becomes more decentralized, decentralized trading is poised to become
            the norm, and it offers an exciting future for the cryptocurrency industry.
          </p>
          <div className="w-1/2 mt-3">
            <Button text="Learn More" className="inline-block" type="secondary" />
          </div>
        </div>
        <div className="right-side relative col-span-2">
          <img
            src={TradingIMG}
            alt="trading img"
            className="w-full h-full border rounded-md absolute top-0 -right-24"
          />
        </div>
      </div>
    </section>
  )
}

export default TradeForFree
