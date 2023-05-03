import { SelectCustom } from "@components/common"
import React from "react"

const TradeHistory = () => {
  return (
    <div className="trade-history w-full">
      <div className="trade-header lg:flex lg:items-start ">
        <div className="header-group-filter flex flex-grow basis-10 gap-x-5">
          <div className="w-32">
            <SelectCustom
              label="Period"
              options={[
                { label: "1 day", value: "day" },
                { label: "1 Month", value: "month" },
                { label: "3 Months", value: "3months" }
              ]}
              defaultValue="month"
              classNameInput={"p-2"}
              classNameOption={"text-sm"}
            />
          </div>
          <div className="w-32">
            <SelectCustom
              label="Market"
              options={[{ label: "All", value: "all" }]}
              defaultValue="all"
              classNameInput={"p-2"}
              classNameOption={"text-sm"}
            />
          </div>
          <div className="w-32">
            <SelectCustom
              label="Type"
              options={[
                { label: "All", value: "all" },
                { label: "With PNL", value: "pnl" }
              ]}
              defaultValue="all"
              classNameInput={"p-2"}
              classNameOption={"text-sm"}
            />
          </div>
        </div>
        <div className="trade-header-info flex items-center gap-5 mt-3 lg:mt-0">
          <div className="font-medium text-sm">1W Volume: $0</div>
          <div className="font-medium text-sm">1W PNL: $0</div>
          <div className="font-medium text-sm">1W Fees: $0</div>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="text-xs border-b border-slate-700">
          <tr className="text-slate-600">
            <th scope="col" className="py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Market
            </th>
            <th scope="col" className="px-6 py-3">
              Operation
            </th>
            <th scope="col" className="px-6 py-3">
              Side
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Fee
            </th>
            <th scope="col" className="px-6 py-3">
              Realized PNL & ROE
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          <tr className="">
            <th className="py-4 font-light">test</th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="">
            <th className="py-4 font-light">test</th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="">
            <th className="py-4 font-light">test</th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="">
            <th className="py-4 font-light">test</th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="">
            <th className="py-4 font-light">test</th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="">
            <th className="py-4 font-light">test</th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="">
            <th className="py-4 font-light">test</th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TradeHistory
