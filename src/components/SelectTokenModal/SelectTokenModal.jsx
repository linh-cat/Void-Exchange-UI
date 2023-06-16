import Modal from "@components/Modal/Modal"
import { InputCustom } from "@components/common"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { DownIcon, SearchIcon } from "@icons/index"
import { BTC, ETH } from "@img/token"
import React, { useState } from "react"

const SelectTokenModal = ({ label = "Select Token", tooltip = "Tool tips" }) => {
  const [isShowModal, setIsShowModal] = useState(false)

  const headerModal = (
    <div className="flex flex-col gap-2">
      <h3>Select a token</h3>
      <InputCustom
        type="string"
        classNameInput="px-1 py-2"
        placeHolder="Search token or input address"
        leftSide={<img src={SearchIcon} className="w-4 h-4" alt="search-icon" />}
      />
      <div className="grid grid-cols-5 gap-3">
        <div className="flex border rounded eth-color eth-border px-3 py-1 justify-center gap-1 items-center cursor-pointer">
          <img src={ETH} alt="eth" className="w-5 h-5" />
          <div>ETH</div>
        </div>
        <div className="flex border rounded btc-color btc-border px-3 py-1 justify-center gap-1 items-center cursor-pointer">
          <img src={BTC} alt="btc" className="w-5 h-5" />
          <div>ETH</div>
        </div>
      </div>
    </div>
  )

  const bodyModal = (
    <div className="mt-5 border-t">
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex justify-between items-center cursor-pointer hover-opacity">
          <div className="flex items-center gap-3">
            <img src={BTC} alt="btc" className="w-8 h-8" />
            <div className="text-sm text-left">
              <div>Bitcoin</div>
              <div className="text-slate-500 text-sm">BTC</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-slate-500 text-sm">67.000</div>
          </div>
        </div>

        <div className="flex justify-between items-center cursor-pointer hover-opacity">
          <div className="flex items-center gap-3">
            <img src={ETH} alt="eth" className="w-8 h-8" />
            <div className="text-sm text-left">
              <div>Ether</div>
              <div className="text-slate-500 text-sm">ETH</div>
            </div>
          </div>
          <div>
            <div className="text-slate-500 text-sm">1.599</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Modal setOpen={setIsShowModal} open={isShowModal} header={headerModal} body={bodyModal} />
      <div className="border shadow w-full p-3 flex flex-col gap-3 rounded" onClick={() => setIsShowModal(true)}>
        <div className="flex gap-1">
          <label>{label}</label>
          <div className="group-tooltip cursor-pointer">
            <QuestionMarkCircleIcon className="w-4 h-4 text-slate-500" />
            <div className="tooltip p-3 rounded hidden">{tooltip}</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex border px-2 py-2 rounded gap-2 items-center cursor-pointer ">
            <img src={BTC} className="h-6 w-6" alt="token-item" />
            <div>WBTC</div>
            <img src={DownIcon} alt="down-icon" className="h-2 w-2" />
          </div>
          <div className="text-slate-500"></div>
        </div>
      </div>
    </>
  )
}

export default SelectTokenModal
