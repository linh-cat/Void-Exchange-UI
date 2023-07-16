import Button from "@components/Button/Button"
import Card from "@components/Card/Card"
import TableCustom from "@components/Table/TableCustom"
import Footer from "@components/Footer/Footer"

import { Void } from "@img/logo"
import { CopyIcon } from "@icons/index"
import { ApeBG } from "@img/bg"
import { useAccount, useBalance } from "wagmi"
import { getPageTitle, truncate } from "src/lib/utils"
import { formatDecimals } from "src/lib/formatter"
import { ETH } from "@img/token"
import SEO from "@components/common/SEO"

const columnDef = [
  {
    field: "account",
    headerName: "Account",
    headerClassName: "text-left px-3",
    cellRenderer: (cell) => {
      return (
        <div className="flex items-center gap-3">
          <img src={ApeBG} alt="ape" className="w-10 h-10 rounded" />
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
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  return (
    <SEO title={getPageTitle("Profile")}>
      <div className="flex flex-col gap-20">
        <div className="container mx-auto max-w-7xl py-10 flex flex-col gap-5 px-10 2xl:px-0 ">
          <h3 className="text-xl font-medium">Profile Overview</h3>
          <Card className={"p-5"}>
            <div className="flex justify-between flex-col md:flex-row ">
              <div className="flex flex-col items-center w-full xl:w-96 bg-none">
                <img className="w-20 h-20 rounded-full" src={ApeBG} alt="Extra large avatar" />
                <div className="address text-slate-500">
                  {isConnected ? truncate(address, 7) : ""}
                  <span className="inline-block cursor-pointer ml-1">
                    <img src={CopyIcon} className="w-5 h-5" alt="copy" />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-10 bg-none">
                <div className="balance-wallet flex flex-col gap-3">
                  <label className="text-slate-500 text-lg">Wallet balance</label>
                  <div className="flex items-center gap-2">
                    <img src={ETH} className="h5 w-5" alt="token" />
                    <span className="text-lg font-medium">
                      {formatDecimals(balance?.formatted, 2)} {balance?.symbol}
                    </span>
                  </div>
                  <Button text="Deposit Crypto" isDefault={false} className={"border py-2"} />
                </div>
                {/* <div className="balance-exchange flex flex-col gap-3">
                <label className="text-slate-500 text-lg">Exchange balance</label>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">$0.00</span>
                </div>
                <Button text="Withdraw Crypto" isDefault={false} className={"border py-2"} />
              </div>
              <div className="fee-discount flex flex-col gap-3">
                <label className="text-slate-500 text-lg">Fee Discount</label>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">0%</span>
                </div>
                <Button text="Stake" isDefault={false} className={"border py-2"} />
              </div> */}
              </div>
            </div>
          </Card>
          <Card className="p-5" hasShadow={true}>
            <div className="flex justify-between items-center flex-col md:flex-row gap-5">
              <div className="flex items-center gap-5">
                <img src={Void} alt="bsca" className="w-10 h-10" />
                <div>
                  <div>Invite your friends to use Void Exchange</div>
                  <div className="text-sm text-slate-500">Earn up to a 40% commission on trading fees</div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button text="Copy affiliate link" />
                <div className="text-xs text-slate-500">
                  By copying th affiliate link, you agree to the{" "}
                  <span className="text-blue-400">Affiliate Agreement</span>.
                </div>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className={"p-5"}>
              <div className="flex flex-col gap-3">
                <label className="text-slate-500 ">Profit / Loss (%)</label>
                <div>
                  <div className="text-xl">0.00%</div>
                  <div className="text-xs text-slate-500">Past 30 Days</div>
                </div>
              </div>
            </Card>
            <Card className={"p-5"}>
              <div className="flex flex-col gap-3">
                <label className="text-slate-500 ">Profit / Loss ($)</label>
                <div>
                  <div className="text-xl">$0.00</div>
                  <div className="text-xs text-slate-500">Past 30 Days</div>
                </div>
              </div>
            </Card>
            <Card className={"p-5"}>
              <div className="flex flex-col gap-3">
                <label className="text-slate-500 ">Volume</label>
                <div>
                  <div className="text-xl">$0.00</div>
                  <div className="text-xs text-slate-500">Past 30 Days</div>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <h3 className="text-lg">Affiliate History</h3>
            <div className="w-full md:w-1/2 ">
              <TableCustom
                columnDef={columnDef}
                data={[{ account: "11e324e...121231", date: "13 May 2023", avt: "" }]}
                cellStyle="p-3"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SEO>
  )
}

export default ProfilePage
