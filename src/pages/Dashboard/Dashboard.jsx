import React from "react"
import "./Dashboard.css"
import BTC from "@img/btc.png"
import ETH from "@img/WETH.png"
import { DownIconGreen, DownIconRed } from "@icons/index"
import DogeCoin from "@img/dogecoin.png"
import Solana from "@img/solana.png"
import Polygon from "@img/polygon.png"

const Dashboard = () => {
  return (
    <div className="dashboard container mx-auto pt-10">
      <section className="standard-asset p-5 rounded border border-slate-500">
        <h3 className="font-medium text-lg">Standard Assets</h3>
        <table className="w-full">
          <thead className="border-b border-slate-700 text-slate-400 text-sm md:text-sm">
            <tr>
              <th scope="col" className="font-medium">
                Asset
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
            <tr className="border-b border-slate-700">
              <td className="text-sm font-medium">
                <div className="flex gap-2">
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
                    <label>$-235.95</label>
                  </div>
                  <div className="font-mono">-0.79%</div>
                </div>
              </td>
              <td className="text-sm font-medium">$1</td>
              <td className="text-sm font-medium">$67,964.57</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="text-sm font-medium">
                <div className="flex gap-2">
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
                    <label>$-23.95</label>
                  </div>
                  <div className="font-mono">-1.70%</div>
                </div>
              </td>
              <td className="text-sm font-medium">$1</td>
              <td className="text-sm font-medium">$67,964.57</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="text-sm font-medium">
                <div className="flex gap-2">
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
                    <label>$+235.95</label>
                  </div>
                  <div className="font-mono">100%</div>
                </div>
              </td>
              <td className="text-sm font-medium">$1</td>
              <td className="text-sm font-medium">$67,964.57</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="text-sm font-medium">
                <div className="flex gap-2">
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
                    <label>$0,06542</label>
                  </div>
                  <div className="font-mono">5.52%</div>
                </div>
              </td>
              <td className="text-sm font-medium">$0</td>
              <td className="text-sm font-medium">-</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="text-sm font-medium">
                <div className="flex gap-2">
                  <img src={Polygon} alt="polygon" className="w-12 h-12" />
                  <div>
                    <label>Polygon</label>
                    <div className="text-slate-400">MATIC</div>
                  </div>
                </div>
              </td>
              <td className="text-sm font-medium">$17.8200</td>
              <td className="text-sm font-medium green-up">
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <img src={DownIconRed} alt="down" />
                    <label>$0,06542</label>
                  </div>
                  <div className="font-mono">-2.22%</div>
                </div>
              </td>
              <td className="text-sm font-medium">$0</td>
              <td className="text-sm font-medium">$15,115</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Dashboard
