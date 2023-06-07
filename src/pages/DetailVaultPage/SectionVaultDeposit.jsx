import React, { useState, useCallback } from "react"
import { useBalance, useAccount } from "wagmi"

import LineChart from "@components/LineChart/LineChart"
import cx from "classnames"
import Card from "@components/Card/Card"
import Button from "@components/Button/Button"
import { ETH } from "@img/token"

import useVault from "src/hooks/useVault"
import useAllowance from "src/hooks/useAllowance"
import { isEthereumAddress } from "src/types"

/**
 * SectionVaultDeposit.
 *
 * @param {Object} props
 * @param {Object} props.tokenAddress Address of the token
 * @param {Object} props.vaultAddress Address of the vault
 */
const SectionVaultDeposit = ({
  tokenAddress = "0x1C9DC6C4c37E9D5A71386104fDE19b2511877acD",
  vaultAddress = "0xe9782D26ABc19FF5174F77e84B0dD19D47635043"
}) => {
  const [tab, setTab] = useState("deposit")
  const [amount, setAmount] = useState(localStorage.getItem("allowance") || "")

  const { address } = useAccount()

  const { data } = useBalance({
    address: address,
    token: "0x1C9DC6C4c37E9D5A71386104fDE19b2511877acD", // WETH
    watch: true
  })

  const { allowance, approve, isApproving } = useAllowance({
    token: "0x1C9DC6C4c37E9D5A71386104fDE19b2511877acD",
    account: address,
    spender: "0xe9782D26ABc19FF5174F77e84B0dD19D47635043",
    tokenDecimals: data?.decimals || 0
  })

  console.log({ amount })

  const { deposit, isLoading: isDepositing } = useVault("0x1C9DC6C4c37E9D5A71386104fDE19b2511877acD")

  const onDeposit = React.useCallback(async () => {
    await deposit(amount, address, address)
    setAmount("")
    localStorage.removeItem("allowance")
  }, [address, amount, deposit])

  const onApprove = React.useCallback(() => {
    approve(amount)
    localStorage.setItem("allowance", amount)
  }, [amount, approve])

  const renderButton = useCallback(() => {
    // if allowance is greater than amount, then render deposit button
    console.log({ allowance })
    if (allowance >= amount) {
      return (
        <Button
          className="py-1 tracking-wider rounded"
          text="Add Liquidity"
          onClick={onDeposit}
          isLoading={isDepositing}
          disabled={amount === ""}
        />
      )
    }

    return (
      <Button
        className="py-1 tracking-wider rounded"
        text="Approve"
        onClick={onApprove}
        isLoading={isApproving}
        disabled={amount === ""}
      />
    )
  }, [allowance, amount, isApproving, isDepositing, onApprove, onDeposit])

  const onChangeTab = (val) => {
    setTab(val)
  }

  return (
    <div className="container mx-auto max-w-7xl mt-10">
      <Card
        className="card-deposit-vault w-full overflow-hidden"
        header={
          <div className="card-header grid grid-cols-2 md:grid-cols-4 px-5 py-3 ">
            <div className="currency">
              <label>USDT</label>
              <div className="text-slate-500">$1.00</div>
            </div>
            <div className="current-apy">
              <div>4.96%</div>
              <label className="text-sm text-slate-500">Current APY</label>
            </div>
            <div className="total-supply">
              <div>874,700 USDT</div>
              <label className="text-sm text-slate-500">Total Supplied</label>
            </div>
            <div className="total-borrow">
              <div>746,200 USDT</div>
              <label className="text-sm text-slate-500">Total Borrowed</label>
            </div>
          </div>
        }
        hasShadow={true}
      >
        {/* bottom content */}
        <div className="flex-1 p-5 grid grid-cols-1 lg:grid-cols-4 gap-5">
          <Card className="supply-liquidity-chart col-span-full lg:col-span-3">
            <LineChart
              chartData={{
                labels: ["Utilization", "40%", "60%", "100%"],
                datasets: [
                  {
                    id: 1,
                    label: "Supply APY",
                    data: [1, 40, 60, 100],
                    tension: 0.4,
                    backgroundColor: "#09a7eb",
                    borderColor: "#09a7eb"
                    // pointRadius: 0,
                    // pointHitRadius: 0,
                    // pointHoverRadius: 0
                  },
                  {
                    id: 1,
                    label: "Borrow APY",
                    data: [1, 20, 40, 90],
                    tension: 0.4,
                    backgroundColor: "#16BE76",
                    borderColor: "#16BE76"
                    // pointRadius: 0,
                    // pointHitRadius: 0,
                    // pointHoverRadius: 0
                  }
                ]
              }}
              showYaxis={false}
              showGrid={false}
            />
          </Card>
          <div className="flex flex-col gap-3">
            <Card>
              <div className="deposit-card p-5 w-full border rounded flex flex-col gap-3">
                <div className="btn-group flex border rounded overflow-hidden w-full">
                  <div
                    className={cx({
                      "w-1/2 text-center py-2 text-sm cursor-pointer tracking-wider": true,
                      "active-tab": tab === "deposit"
                    })}
                    onClick={() => onChangeTab("deposit")}
                  >
                    Deposit
                  </div>
                  <div
                    className={cx({
                      "w-1/2 text-center py-2 text-sm cursor-pointer tracking-wider": true,
                      "active-tab": tab === "withdraw"
                    })}
                    onClick={() => onChangeTab("withdraw")}
                  >
                    Withdraw
                  </div>
                </div>
                {tab === "deposit" && (
                  <>
                    <div className="flex flex-col gap-3 border p-3 rounded">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Currency</label>
                        <div className="flex gap-3">
                          <div
                            className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer"
                            onClick={() => setAmount(data?.formatted / 2)}
                          >
                            50%
                          </div>
                          <div
                            className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer"
                            onClick={() => setAmount(data?.formatted)}
                          >
                            MAX
                          </div>
                        </div>
                      </div>
                      <div className="token flex gap-2 justify-between border rounded py-2 pl-2 pr-1">
                        <input
                          type="number"
                          className="p-0 flex-1 text-left"
                          onChange={(e) => {
                            setAmount(e.target.value)
                          }}
                          placeholder="0"
                          value={amount}
                        />
                        <div className="flex gap-2 items-center border py-1 px-2 rounded-xl">
                          <img src={ETH} alt="ETH" className="w-5 h-5" />
                          <label className="">ETH</label>
                        </div>
                      </div>
                      <div className="ballance flex items-center gap-2">
                        <label className="text-sm">Balance:</label>
                        <div>{data?.formatted}</div>
                      </div>
                    </div>
                    {renderButton()}
                  </>
                )}
                {tab === "withdraw" && (
                  <>
                    <div className="flex flex-col gap-3 border p-3 rounded">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Currency</label>
                        <div className="flex gap-3">
                          <div className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer">50%</div>
                          <div className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer">MAX</div>
                        </div>
                      </div>
                      <div className="token flex gap-2 justify-between">
                        <div className="flex gap-2 items-center border py-1 px-2 rounded-3xl">
                          <img src={ETH} alt="ETH" className="w-5 h-5" />
                          <label className="">ETH</label>
                        </div>
                        <input type="number" className="p-0 flex-1 text-right" placeholder="0" />
                      </div>
                      <div className="ballance flex items-center gap-2">
                        <label className="text-sm">Balance:</label>
                        <div>{data?.formatted}</div>
                      </div>
                    </div>
                    <Button className="py-2 tracking-wider rounded" text="Withdraw" />
                  </>
                )}
              </div>
            </Card>
            {/* my positions */}
            <Card className="my-position p-3">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-slate-500">Portfolio Value</label>
                  <div>$7243.13</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="text-xs text-slate-500">Collateral</label>
                    <div>$3000</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Leverage</label>
                    <div>0.5x</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="text-xs text-slate-500">Total Unrealized P&L</label>
                    <div className="green-up">+21.04</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Total Realized P&L</label>
                    <div className="green-up">+320</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}

SectionVaultDeposit.propTypes = {
  tokenAddress: isEthereumAddress,
  vaultAddress: isEthereumAddress
}

export default SectionVaultDeposit
