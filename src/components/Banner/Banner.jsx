import React from "react"
import "./Banner.css"
import { useNavigate } from "react-router-dom"
import Button from "@components/Button/Button"
import Card from "@components/Card/Card"
import { DownIconGreen, DownIconRed } from "@icons/index"
import { BaseIcon } from "@img/icons"
import { BTC, ETH, MATIC, POLYGON, SOLANA } from "@img/token"

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
        <h1 className="text-5xl font-bold text-center flex items-center justify-center drop-shadow">
          Perpeptual Exchange on Base
          <a href="https://base.org/">
            <img src={BaseIcon} className="ml-5 w-14 h-14 inline-block" alt="icon" />
          </a>
        </h1>

        <p className="py-3 md:py-8 text-center">Void Exchange is a perpetual futures dex for assets</p>
        <div className="w-full relative">
          <Button
            text="Trade Now"
            className="inline-block ml-auto absolute left-1/2 -translate-x-1/2 w-1/2 md:w-1/6"
            type="secondary"
            onClick={() => navigate("/trade")}
          />
        </div>

        <Card className="p-8 mt-20 w-full lg:w-3/4 mx-auto" hasShadow={true}>
          <div className="flex flex-col gap-5">
            <h3 className="text-slate-500">24h Most Volume</h3>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex justify-between items-center ">
                <div className="item flex justify-center items-center gap-3">
                  <div className="flex justify-center items-center">
                    <img src={BTC} alt="BTC" className="w-10 h-10 border rounded-full" />
                  </div>

                  <div className="text-sm">
                    <label className="">WBTC</label>
                    <div className="flex items-center gap-3 mt-1">
                      <div>$1</div>
                      <div className="flex items-center gap-1 text-sm border bg-errorLight rounded px-2">
                        <img src={DownIconRed} alt="down" className="" />
                        <label className="red-down">-0.01</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item flex justify-center items-center gap-3">
                  <div className=" flex justify-center items-center">
                    <img src={ETH} alt="eth" className="w-10 h-10 border rounded-full" />
                  </div>

                  <div className="text-sm ">
                    <label className="">WETH</label>
                    <div className="flex items-center gap-3 mt-1">
                      <div>$1</div>
                      <div className="flex items-center gap-1 text-sm rounded bg-successLight px-2">
                        <img src={DownIconGreen} alt="down" className="rotate-180" />
                        <label className="green-up">-0.01</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item flex justify-center items-center gap-3">
                  <div className=" flex justify-center items-center">
                    <img src={POLYGON} alt="polygon" className="w-10 h-10 border rounded-full" />
                  </div>

                  <div className="text-sm ">
                    <label className="">POLYGON</label>
                    <div className="flex items-center gap-3 mt-1">
                      <div>$1</div>
                      <div className="flex items-center gap-1 text-sm rounded px-2 bg-successLight">
                        <img src={DownIconGreen} alt="down" className="rotate-180" />
                        <label className="green-up">-0.01</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item flex justify-center items-center gap-3">
                  <div className=" flex justify-center items-center">
                    <img src={MATIC} alt="matic" className="w-10 h-10 border rounded-full" />
                  </div>

                  <div className="text-sm ">
                    <label className="">WBTC</label>
                    <div className="flex items-center gap-3 mt-1">
                      <div>$1</div>
                      <div className="flex items-center gap-1 text-sm rounded bg-errorLight px-2">
                        <img src={DownIconRed} alt="down" className="" />
                        <label className="red-down">-0.01</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item flex justify-center items-center gap-3">
                  <div className=" flex justify-center items-center">
                    <img src={SOLANA} alt="BTC" className="w-10 h-10 border rounded-full" />
                  </div>

                  <div className="text-sm ">
                    <label className="">SOLANA</label>
                    <div className="flex items-center gap-3 mt-1">
                      <div>$1</div>
                      <div className="flex items-center gap-1 text-sm  rounded bg-errorLight px-2">
                        <img src={DownIconRed} alt="down" className="" />
                        <label className="red-down">-0.01</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default Banner
