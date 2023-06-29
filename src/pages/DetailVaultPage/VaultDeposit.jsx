import React, { useState, useCallback, useMemo } from "react"
import { useBalance, useAccount } from "wagmi"

import LineChart from "@components/LineChart/LineChart"
import cx from "classnames"
import Card from "@components/Card/Card"
import Button from "@components/Button/Button"
import { BTC, ETH, USDC } from "@img/token"
import { InputCustom } from "@components/common"

import useVault from "src/hooks/useVault"
import useAllowance from "src/hooks/useAllowance"
import useDebounce from "src/hooks/useDebounce"
import { isEthereumAddress } from "src/types"
import { decimalsFormatter } from "src/lib/formatter"

/**
 * SectionVaultDeposit.
 *
 * @param {Object} props
 * @param {Object} props.tokenAddress Address of the token
 * @param {Object} props.vaultAddress Address of the vault
 */

const VaultDeposit = ({ tokenAddress, vaultAddress, vaultId }) => {
  const [tab, setTab] = useState("deposit")
  const [amount, setAmount] = useState("")

  const { address } = useAccount()

  const { data: balance } = useBalance({
    address: address,
    token: tokenAddress, // WETH
    watch: true
  })

  const { allowance, approve, isApproving } = useAllowance({
    token: tokenAddress,
    account: address,
    spender: vaultAddress,
    tokenDecimals: balance?.decimals || 0
  })

  const { deposit, isLoading: isDepositing } = useVault(tokenAddress, vaultAddress)

  const onChangeAmount = (val) => {
    if (Number(balance?.formatted) < Number(val)) {
      setAmount(balance?.formatted)
      return
    }
    setAmount(val)
  }

  const onDeposit = React.useCallback(async () => {
    await deposit(amount, address, address)
    setAmount("")
  }, [address, amount, deposit])

  const onApprove = React.useCallback(() => {
    approve(amount)
  }, [amount, approve])

  const onDebounceApprove = useDebounce(onApprove, 1000)

  const renderButton = useCallback(() => {
    // if allowance is greater than amount, then render deposit button
    if (allowance >= amount) {
      return (
        <Button
          className="py-1 tracking-wider rounded"
          text="Add Liquidity"
          onClick={onDeposit}
          isLoading={isDepositing}
          disabled={amount === "" || isDepositing}
        />
      )
    }

    return (
      <Button
        className="py-1 tracking-wider rounded"
        text="Approve"
        onClick={onDebounceApprove}
        isLoading={isApproving}
        disabled={amount === "" || isApproving}
      />
    )
  }, [allowance, amount, isApproving, isDepositing, onDeposit, onDebounceApprove])

  const onChangeTab = (val) => {
    setTab(val)
  }

  const imgToken = useMemo(() => {
    switch (Number(vaultId)) {
      case 1:
        return ETH
      case 2:
        return BTC

      case 4:
        return USDC

      default:
        break
    }
  }, [vaultId])

  return (
    <div className="container mx-auto max-w-7xl mt-10">
      <Card
        className="card-deposit-vault w-full overflow-hidden"
        header={
          <div className="card-header grid grid-cols-2 md:grid-cols-4 px-5 py-3 ">
            <div className="currency">
              <label>TVL</label>
              <div className="text-slate-500">$3,000,000</div>
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
            <div className="deposit-card w-full flex flex-col gap-3">
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
                          onClick={() => setAmount(balance?.formatted / 2)}
                        >
                          50%
                        </div>
                        <div
                          className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer"
                          onClick={() => setAmount(balance?.formatted)}
                        >
                          MAX
                        </div>
                      </div>
                    </div>
                    <div className="token border rounded py-2 pl-2">
                      <InputCustom
                        type="number"
                        classNameInput="p-0"
                        onChange={onChangeAmount}
                        placeHolder="0.0"
                        value={amount}
                        isBorder={false}
                        rightAction={
                          <div className="flex gap-2 mr-1 items-center">
                            <img src={imgToken} alt="token" className="w-6 h-5" />
                          </div>
                        }
                        disabled={isApproving || isDepositing}
                      />
                    </div>
                    <div className="ballance flex items-center gap-2">
                      <label className="text-sm">Balance:</label>
                      <div>{decimalsFormatter(balance?.formatted, 4)}</div>
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
                    <div className="token border rounded py-2 pl-2">
                      <InputCustom
                        type="number"
                        classNameInput="p-0"
                        onChange={onChangeAmount}
                        placeHolder="0.0"
                        value={amount}
                        isBorder={false}
                        rightAction={
                          <div className="flex gap-2 mr-1 items-center">
                            <img src={imgToken} alt="token" className="w-6 h-5" />
                          </div>
                        }
                        disabled={isApproving || isDepositing}
                      />
                    </div>
                    <div className="ballance flex items-center gap-2">
                      <label className="text-sm">Balance:</label>
                      <div>{decimalsFormatter(balance?.formatted, 4)}</div>
                    </div>
                  </div>
                  <Button className="py-2 tracking-wider rounded" text="Withdraw" />
                </>
              )}
            </div>
            {/* my positions */}
            <Card className="my-position p-3">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-slate-500">Total Deposit</label>
                  <div>100 ETH</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="text-xs text-slate-500">Value</label>
                    <div>$183,228.00</div>
                  </div>
                  {/* <div> */}
                  {/*   <label className="text-xs text-slate-500">Leverage</label> */}
                  {/*   <div>0.5x</div> */}
                  {/* </div> */}
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="text-xs text-slate-500">Estimated Profit Next Epoch</label>
                    <div className="green-up">+21.04</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Estimated Loss</label>
                    <div className="red-down">-320</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="text-xs text-slate-500">Total estimated unrealized P&L</label>
                    <div className="green-up">+$4,222</div>
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

VaultDeposit.propTypes = {
  tokenAddress: isEthereumAddress,
  vaultAddress: isEthereumAddress
}

export default VaultDeposit
