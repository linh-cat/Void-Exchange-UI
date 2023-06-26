import React from "react"
import Modal from "@components/Modal/Modal"
import { BTC } from "@img/token"
import Button from "@components/Button/Button"

const CLosingModal = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      header={
        <div className="flex gap-3">
          <div>Close BTC Position -</div>
          <div className="green-up">Long 10.0X</div>
        </div>
      }
      body={
        <div className="flex flex-col gap-5 ">
          <div className="grid grid-cols-2 gap-3">
            <div className="border py-2 px-2 rounded text-left ">
              <h5 className="text-slate-500 text-sm">Market Price</h5>
              <div>$30,144</div>
            </div>
            <div className="border py-2 px-2 rounded text-left">
              <h5 className="text-slate-500 text-sm">Order Type</h5>
              <div>Market</div>
            </div>
          </div>
          <div className="border p-2 flex flex-col gap-3">
            <div className="flex justify-between">
              <h5 className="text-sm text-slate-500">Close Amount</h5>
              <div className="text-slate-500 text-sm">Max: 0.00019</div>
            </div>
            <div className="flex justify-between">
              <div>0.00194</div>
              <div className="flex items-center gap-1">
                <img src={BTC} alt="icon" className="w-5 h-5" />
                <div>BTC</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="active rounded py-1 cursor-pointer">25%</div>
              <div className="bg-slate-900 py-1 rounded cursor-pointer">50%</div>
              <div className="bg-slate-900 py-1 rounded cursor-pointer">75%</div>
              <div className="bg-slate-900 py-1 rounded cursor-pointer">100%</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h5 className="text-slate-500 text-sm">Profits In</h5>
            <div className="flex items-center gap-1">
              <img src={BTC} className="w-4 h-4" alt="token" />
              <div className="text-sm">BTC</div>
            </div>
          </div>
          <div className="w-full h-1 bg-slate-800"></div>
          <div className="flex flex-col gap-2">
            <div className="flex text-sm items-center justify-between">
              <h5 className="text-slate-500">Entry & Index Price</h5>
              <div className="text-sm">$25,513 / $30,155</div>
            </div>
            <div className="flex text-sm items-center justify-between">
              <h5 className="text-slate-500">Market Price</h5>
              <div className="text-sm">$30,155</div>
            </div>
            <div className="flex text-sm items-center justify-between">
              <h5 className="text-slate-500">Spread</h5>
              <div className="text-sm">0%</div>
            </div>
            <div className="flex text-sm items-center justify-between">
              <h5 className="text-slate-500">Size</h5>
              <div className="text-sm flex items-center gap-1">
                <div className="text-slate-500">0,00194 BTC</div> - <span>0 BTC</span>
              </div>
            </div>
            <div className="flex text-sm items-center justify-between">
              <h5 className="text-slate-500">Leverage</h5>
              <div className="text-sm flex items-center gap-1">
                <div className="text-slate-500">10.0X</div> - <span>0.0X</span>
              </div>
            </div>
            <div className="flex text-sm items-center justify-between">
              <h5 className="text-slate-500">Liq. Price</h5>
              <div className="text-sm flex items-center gap-1">
                <div className="text-slate-500">$23,233</div> - <span>$0</span>
              </div>
            </div>
            <div className="flex text-sm items-center justify-between">
              <h5 className="text-slate-500">Collateral (USDC.e)</h5>
              <div className="text-sm flex items-center gap-1">
                <div className="text-slate-500">$4.96</div> - <span>$0</span>
              </div>
            </div>
            <div className="flex text-sm items-center justify-between">
              <h5 className="text-slate-500">Current Total PNL</h5>
              <div className="text-sm flex items-center gap-1">
                <div className="green-up">+$9.01</div> <span className="">(+175.28%)</span>
              </div>
            </div>
          </div>
          <div className="w-full h-1 bg-slate-800"></div>
          <div>
            <div className="text-sm flex items-center justify-between">
              <h5 className="text-slate-500">Fee</h5>
              <div>$0.36</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <h5>You will receive</h5>
            <div className="dotted-underline cursor-pointer">0.0028 BTC</div>
          </div>
          <div>
            <Button text="Close" />
          </div>
        </div>
      }
    />
  )
}

export default CLosingModal
