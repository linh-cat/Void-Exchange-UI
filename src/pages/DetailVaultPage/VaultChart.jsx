import BarChart from "@components/BarChart/BarChart"
import Card from "@components/Card/Card"
import TableCustom from "@components/Table/TableCustom"
import React from "react"

const columnDef = [
  {
    field: "address",
    headerName: "Address",
    headerClassName: "text-sm"
  },
  {
    field: "amount",
    headerName: "Amount",
    headerClassName: "text-sm"
  },
  {
    field: "value",
    headerName: "Value",
    headerClassName: "text-sm"
  },
  {
    field: "time",
    headerName: "Time",
    headerClassName: "text-sm"
  },
  {
    field: "expanlink",
    headerName: "Expand Link",
    headerClassName: "text-sm",
    cellRenderer: () => {
      return (
        <a href="#" target="_blank" className="link-color">
          Etherscan
        </a>
      )
    }
  },
  {
    headerName: "Active",
    headerClassName: "text-sm",
    cellRenderer: () => {
      return (
        <div className="flex items-center justify-center gap-1">
          <div className="link-color cursor-pointer">Deposit</div>
          <div className="bg-slate-500 w-1 h-full"></div>
          <div className="link-color cursor-pointer">Withdraw</div>
        </div>
      )
    }
  }
]

const data = [
  {
    address: "0x42...D78aD",
    amount: "0.1ETH",
    value: "$2000",
    time: "1 hour ago",
    expanlink: "Etherscan"
  }
]

const VaultChart = () => {
  return (
    <div className="container mx-auto max-w-7xl mt-10 px-3 xl:px-0">
      <div className="card-deposit-vault grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="xl:col-span-1 relative p-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="liquidity p-3" hasShadow={true}>
              <label className="text-slate-500 text-xs">Liquidity</label>
              <div className="">$11.06m</div>
              <span className="text-xs green-up">+0.08</span>
            </Card>
            <Card className="volume p-3" hasShadow={true}>
              <label className="text-slate-500 text-xs">Volume(24h)</label>
              <div>$13.82k</div>
              <span className="red-down text-xs">-73.40%</span>
            </Card>
            <Card className="fee p-3" hasShadow={true}>
              <label className="text-slate-500 text-xs">Fee(24h)</label>
              <div>$41.27</div>
              <span className="red-down text-xs">-73.04</span>
            </Card>
            <Card className="transaction p-3" hasShadow={true}>
              <label className="text-slate-500 text-xs">Transaction(24h)</label>
              <div>3</div>
              <span className="red-down text-xs">-40%</span>
            </Card>
          </div>
          <div className="relative">
            <Card className="w-40 border rounded p-2 absolute left-0 top-2">
              <div className="filter-bar flex justify-between">
                <div>1D</div>
                <div>1W</div>
                <div>1M</div>
                <div>1Y</div>
                <div>ALL</div>
              </div>
            </Card>
            <div className="">
              <BarChart showGrid={false} showLegend={false} showXaxis={false} showYaxis={false} labelForChart="Earn" />
            </div>
          </div>
        </Card>
        <div className="gr-info border p-5 gap-5 rounded">
          <h3>Vault Activities</h3>
          <TableCustom columnDef={columnDef} data={data} cellStyle="text-sm py-1" />
        </div>
      </div>
    </div>
  )
}

export default VaultChart
