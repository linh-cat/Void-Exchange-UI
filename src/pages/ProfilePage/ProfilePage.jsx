import Button from "@components/Button/Button"
import CardWrapper from "@components/CardWrapper/CardWrapper"
import React from "react"
import BSScan from "@img/bscscan.png"
import DogeCoin from "@img/dogecoin.png"
import { CopyIcon } from "@icons/index"
import APE from "@img/ape.png"
import Mobo from "@img/morpho.png"
import TableCustom from "@components/Table/TableCustom"

const columnDef = [
  {
    field: "account",
    headerName: "Account",
    cellRenderer: (cell) => {
      return (
        <div className="flex items-center gap-3">
          <img src={APE} alt="ape" className="w-10 h-10 rounded" />
          <div>{cell?.account}</div>
        </div>
      )
    }
  },
  {
    field: "date",
    headerName: "Date"
  }
]

const ProfilePage = () => {
  return (
    <div className="container mx-auto max-w-7xl py-10 flex flex-col gap-5 ">
      <h3 className="text-xl font-medium">Profile Overview</h3>
      <div
        className="bg-cover blur-3xl bg-center w-full h-6 absolute top-40 right-28"
        style={{ backgroundImage: `url(${Mobo})` }}
      ></div>
      <CardWrapper className={"p-5"}>
        <div className="flex justify-between flex-col md:flex-row ">
          <div className="flex flex-col items-center w-full xl:w-96 bg-none">
            <img className="w-20 h-20 rounded-full" src={APE} alt="Extra large avatar" />
            <div className="address text-zinc-500">
              0xe6e6ee66e....5d01232{" "}
              <span className="inline-block cursor-pointer">
                <img src={CopyIcon} className="w-5 h-5" alt="copy" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-10 bg-none">
            <div className="ballance-wallet flex flex-col gap-3">
              <label className="text-zinc-500 text-lg">Wallet Ballance</label>
              <div className="flex items-center gap-2">
                <img src={DogeCoin} className="h5 w-5" alt="otoken" />
                <span className="text-lg font-medium">0.00</span>
              </div>
              <Button text="Deposit Crypto" isDefault={false} className={"border"} />
            </div>
            <div className="ballance-exchange flex flex-col gap-3">
              <label className="text-zinc-500 text-lg">Exchange Ballance</label>
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg">$0.00</span>
              </div>
              <Button text="Withdraw Crypto" isDefault={false} className={"border"} />
            </div>
            <div className="fee-discount flex flex-col gap-3">
              <label className="text-zinc-500 text-lg">Fee Discount</label>
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg">0%</span>
              </div>
              <Button text="Stake" isDefault={false} className={"border"} />
            </div>
          </div>
        </div>
      </CardWrapper>
      <CardWrapper className="p-5" hasShadow={true}>
        <div className="flex justify-between items-center flex-col md:flex-row gap-5">
          <div className="flex items-center gap-5">
            <img src={BSScan} alt="bsca" className="w-10 h-10" />
            <div>
              <div>Invite your friends to use Void Exchange</div>
              <div className="text-sm text-zinc-500">Earn up to a 40% commission on trading fees</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button text="Copy affiliate link" />
            <div className="text-xs text-zinc-500">
              By copying th affiliate link, you agree to the <span className="text-blue-400">Affiliate Agreement</span>.
            </div>
          </div>
        </div>
      </CardWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <CardWrapper className={"p-5"}>
          <div className="flex flex-col gap-3">
            <label className="text-zinc-500 ">Profit / Loss (%)</label>
            <div>
              <div className="text-xl">0.00%</div>
              <div className="text-xs text-zinc-500">Past 30 Days</div>
            </div>
          </div>
        </CardWrapper>
        <CardWrapper className={"p-5"}>
          <div className="flex flex-col gap-3">
            <label className="text-zinc-500 ">Profit / Loss ($)</label>
            <div>
              <div className="text-xl">$0.00</div>
              <div className="text-xs text-zinc-500">Past 30 Days</div>
            </div>
          </div>
        </CardWrapper>
        <CardWrapper className={"p-5"}>
          <div className="flex flex-col gap-3">
            <label className="text-zinc-500 ">Volume</label>
            <div>
              <div className="text-xl">$0.00</div>
              <div className="text-xs text-zinc-500">Past 30 Days</div>
            </div>
          </div>
        </CardWrapper>
      </div>
      <div>
        <h3 className="text-lg">Affiliate History</h3>
        <div className="w-full md:w-1/2 ">
          <TableCustom
            columnDef={columnDef}
            data={[{ account: "11e324e...121231", date: "13 May 2023", avt: "" }]}
            cellStyle="p-3 "
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage