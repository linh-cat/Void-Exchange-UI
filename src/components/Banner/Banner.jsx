import React from "react"
import "./Banner.css"
import { Link, useNavigate } from "react-router-dom"
import Button from "@components/Button/Button"
import CardWrapper from "@components/CardWrapper/CardWrapper"
import BTC from "@img/btc.png"
import ETH from "@img/WETH.png"
import Matic from "@img/matic.png"
import Polygon from "@img/polygon.png"
import Solana from "@img/solana.png"
import { DownIconGreen } from "@icons/index"
import { DownIconRed } from "@icons/index"

const Banner = () => {
  const navigate = useNavigate()
  return (
    <section className="banner-db animation-container">
      {/* <div class="lightning-container">
    <div class="lightning white"></div>
    <div class="lightning blu"></div>
  </div> */}
      <div className="boom-container">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape triangle big yellow"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="boom-container second">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="boom-container third">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="banner-container">
        <h1 className="text-5xl font-bold text-center">Long or Short Assets</h1>
        <p className="py-3 md:py-8 text-center">Void Exchange is a perpetual futures dex for assets</p>
        <div className="w-full relative">
          <Button
            text="Trade Now"
            className="inline-block ml-auto absolute left-1/2 -translate-x-1/2 w-1/2 md:w-1/6"
            type="secondary"
            onClick={() => navigate("/trade")}
          />
        </div>

        <CardWrapper className="banner-info-token p-8 mt-20" hasShadow={true}>
          <div className="flex flex-col gap-5">
            <h3 className="text-slate-500">24h Most Volume</h3>
            <div className="token grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
              <div className="item flex justify-center">
                <div className="flex w-5/6 justify-between items-center">
                  <div className="w-1/4">
                    <img src={BTC} alt="BTC" className="w-10 h-10 border rounded-full" />
                  </div>
                  <div className="text-sm w-2/4 ml-3 text-left">
                    <div className="text-left">
                      <label className="">WBTC</label>
                    </div>
                    <div>$1</div>
                  </div>

                  <div className="flex items-center gap-1 text-sm w-1/4">
                    <img src={DownIconRed} alt="down" className="" />
                    <label className="red-down">-0.01</label>
                  </div>
                </div>
              </div>
              <div className="item flex justify-center">
                <div className="flex w-5/6 justify-between items-center">
                  <div className="w-1/4">
                    <img src={ETH} alt="ETH" className="w-10 h-10 border rounded-full" />
                  </div>
                  <div className="text-sm w-2/4 ml-3">
                    <div className="text-left">
                      <label className="">ETH</label>
                    </div>
                    <div>$1</div>
                  </div>

                  <div className="flex items-center gap-1 text-sm w-1/4">
                    <img src={DownIconRed} alt="down" className="" />
                    <label className="red-down">-0.01</label>
                  </div>
                </div>
              </div>
              <div className="item flex justify-center">
                <div className="flex w-5/6 justify-between items-center">
                  <div className="w-1/4">
                    <img src={Solana} alt="Solana" className="w-10 h-10 border rounded-full" />
                  </div>
                  <div className="text-sm w-2/4 ml-3">
                    <div className="text-left">
                      <label className="">Solana</label>
                    </div>
                    <div>$1</div>
                  </div>

                  <div className="flex items-center gap-1 text-sm w-1/4">
                    <img src={DownIconRed} alt="down" className="" />
                    <label className="red-down">-0.01</label>
                  </div>
                </div>
              </div>
              <div className="item flex justify-center">
                <div className="flex w-5/6 justify-between items-center">
                  <div className="w-1/4">
                    <img src={Polygon} alt="Polygon" className="w-10 h-10 border rounded-full" />
                  </div>
                  <div className="text-sm w-2/4 ml-3">
                    <div className="text-left">
                      <label className="">Polygon</label>
                    </div>
                    <div>$1</div>
                  </div>

                  <div className="flex items-center gap-1 text-sm w-1/4">
                    <img src={DownIconRed} alt="down" className="" />
                    <label className="red-down">-0.01</label>
                  </div>
                </div>
              </div>
              <div className="item flex justify-center">
                <div className="flex w-5/6 justify-between items-center">
                  <div className="w-1/4">
                    <img src={Matic} alt="Matic" className="w-10 h-10 border rounded-full" />
                  </div>
                  <div className="text-sm w-2/4 ml-3">
                    <div className="text-left">
                      <label className="">MATIC</label>
                    </div>
                    <div>$1</div>
                  </div>

                  <div className="flex items-center gap-1 text-sm w-1/4">
                    <img src={DownIconRed} alt="down" className="" />
                    <label className="red-down">-0.01</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>
    </section>
  )
}

export default Banner
