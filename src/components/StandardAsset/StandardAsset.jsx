import React from "react"
import "./StandardAsset.css"
import BTC from "@img/btc.png"
import ETH from "@img/WETH.png"
import DogeCoin from "@img/dogecoin.png"
import Solana from "@img/solana.png"
import Polygon from "@img/polygon.png"
import { DownIconGreen, DownIconRed } from "@icons/index"

const StandardAsset = () => {
  return (
    <section className="standard-asset rounded border border-slate-500 mt-10 container mx-auto">
      <h3 className="font-medium text-lg p-3">Standard Assets</h3>
      <table className="w-full">
        <thead className="border-b border-slate-700 text-slate-400 text-sm md:text-sm ">
          <tr className="">
            <th scope="col" className="font-medium pl-3">
              <div className="pl-3">Asset</div>
            </th>
            <th scope="col" className="font-medium">
              Price
            </th>
            <th scope="col" className="font-medium">
              24h Change
            </th>
            <th scope="col" className=" font-medium">
              24h Volumn
            </th>
            <th scope="col" className=" font-medium">
              Open Interest
            </th>
          </tr>
        </thead>
        <tbody className="pt-1">
          <tr className="border-b border-slate-700 cursor-pointer asset-item ">
            <td className="text-sm font-medium pl-5">
              <div className="flex gap-2 pl-3">
                <img src={BTC} alt="btc" className="w-12 h-12" />
                <div>
                  <label>Bitcoin</label>
                  <div className="text-slate-400">BTC</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$29,991.24</td>
            <td className="text-sm font-medium red-down">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <img src={DownIconRed} alt="down icon" />
                  <div className="">-0.79%</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$1</td>
            <td className="text-sm font-medium">$67,964.57</td>
          </tr>
          <tr className="border-b border-slate-700 cursor-pointer asset-item">
            <td className="text-sm font-medium">
              <div className="flex gap-2  pl-3">
                <img src={ETH} alt="eth" className="w-12 h-12" />
                <div>
                  <label>Ethereum</label>
                  <div className="text-slate-400">ETH</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$1,867.87</td>
            <td className="text-sm font-medium red-down">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <img src={DownIconRed} alt="down" />
                  <div className="">-1.70%</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$1</td>
            <td className="text-sm font-medium">$67,964.57</td>
          </tr>
          <tr className="border-b border-slate-700 cursor-pointer asset-item">
            <td className="text-sm font-medium">
              <div className="flex gap-2  pl-3">
                <img src={DogeCoin} alt="eth" className="w-12 h-12" />
                <div>
                  <label>Dogecoin</label>
                  <div className="text-slate-400">DOGE</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$1</td>
            <td className="text-sm font-medium green-up">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <img src={DownIconGreen} alt="up" className="rotate180" />
                  <div className="">100%</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$1</td>
            <td className="text-sm font-medium">$67,964.57</td>
          </tr>
          <tr className="border-b border-slate-700 cursor-pointer asset-item">
            <td className="text-sm font-medium">
              <div className="flex gap-2  pl-3">
                <img src={Solana} alt="solana" className="w-12 h-12" />
                <div>
                  <label>Solana</label>
                  <div className="text-slate-400">SOL</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$22.6900</td>
            <td className="text-sm font-medium green-up">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <img src={DownIconGreen} alt="up" className="rotate180" />
                  <div className="">5.52%</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$0</td>
            <td className="text-sm font-medium">-</td>
          </tr>
          <tr className="border-b border-slate-700 cursor-pointer asset-item">
            <td className="text-sm font-medium">
              <div className="flex gap-2  pl-3">
                <img src={Polygon} alt="polygon" className="w-12 h-12" />
                <div>
                  <label>Polygon</label>
                  <div className="text-slate-400">MATIC</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$17.8200</td>
            <td className="text-sm font-medium red-down">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <img src={DownIconRed} alt="down" />
                  <div className="">-2.22%</div>
                </div>
              </div>
            </td>
            <td className="text-sm font-medium">$0</td>
            <td className="text-sm font-medium">$15,115</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default StandardAsset
