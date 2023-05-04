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
      <table className="w-full mt-5">
        <thead className="border-b border-zinc-700 text-zinc-500 text-xs md:text-sm">
          <tr>
            <th scope="col" className="font-medium">
              Time
            </th>
            <th scope="col" className="font-medium">
              Market
            </th>
            <th scope="col" className="font-medium">
              Operation
            </th>
            <th scope="col" className="font-medium">
              Side
            </th>
            <th scope="col" className=" font-medium">
              Price
            </th>
            <th scope="col" className=" font-medium">
              Amount
            </th>
            <th scope="col" className=" font-medium">
              Fee
            </th>
            <th scope="col" className=" font-medium">
              Realized PNL & ROE
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-xs font-medium">1</th>
            <td className="text-xs font-medium">2</td>
            <td className="text-xs font-medium">3</td>
            <td className="text-xs font-medium">4</td>
            <td className="text-xs font-medium">5</td>
            <td className="text-xs font-medium">6</td>
            <td className="text-xs font-medium">7</td>
            <td className="text-xs font-medium">8</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TradeHistory
