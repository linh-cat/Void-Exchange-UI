/* global BigInt */
import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "@components/Button/Button"
import Card from "@components/Card/Card"
import { DownIconGreen, DownIconRed } from "@icons/index"
import { BaseIcon } from "@img/icons"
import { BTC, DOGE, ETH, MATIC, PEPE, POLYGON, SOLANA } from "@img/token"
import usePriceList from "src/hooks/usePriceList"
import { formatDollar, formatPercentage } from "src/lib/formatter"
import cx from "classnames"

import "./Banner.css"

const tokenImages = {
  BTC: BTC,
  DOGE: DOGE,
  ETH: ETH,
  MATIC: MATIC,
  POLYGON: POLYGON,
  SOL: SOLANA,
  PEPE: PEPE
}

const Banner = () => {
  const navigate = useNavigate()
  const { data } = usePriceList()

  return (
    <section className="banner-db animation-container">
      {/* <div class="lightning-container">
    <div class="lightning white"></div>
    <div class="lightning blu"></div>
  </div> */}
      <div className="boom-container">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape triangle big text-pending"></div>
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
            <img src={BaseIcon} className="lg:ml-5 w-14 h-14 inline-block max-w-fit" alt="icon" />
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

        <Card className="p-8 mt-20 w-full mx-auto" hasShadow={true}>
          <div className="flex flex-col gap-5">
            <h3 className="text-slate-500">24h Most Volume</h3>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex justify-between items-center ">
                {data &&
                  data.map((item) => (
                    <div className="item flex justify-center items-center gap-3" key={item?.label}>
                      <div className="flex justify-center items-center">
                        <img
                          src={tokenImages[item?.symbol]}
                          alt={item?.symbol}
                          className="w-10 h-10 border rounded-full"
                        />
                      </div>

                      <div className="text-sm">
                        <label className="">{item?.symbol}</label>
                        <div className="flex items-center gap-3 mt-1">
                          <div>{formatDollar(item?.price)}</div>
                          <div
                            className={cx("flex items-center gap-1 text-xs rounded-full py-0.5 px-2", {
                              "bg-errorLight": item?.volumeChange24h < 0,
                              "bg-successLight": item?.volumeChange24h >= 0
                            })}
                          >
                            {item?.volumeChange24h < 0 ? (
                              <img src={DownIconRed} alt="down" className="" />
                            ) : (
                              <img src={DownIconGreen} alt="up" className="rotate-180" />
                            )}
                            <label
                              className={cx({
                                "text-error": item?.volumeChange24h < 0,
                                "text-success": item?.volumeChange24h >= 0
                              })}
                            >
                              {formatPercentage(item?.percentChange24h)}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default Banner
