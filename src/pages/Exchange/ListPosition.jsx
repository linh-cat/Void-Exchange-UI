import React from "react"
import ETH from "@img/WETH.png"

const ListPosition = () => {
  return (
    <table className="w-full">
      <thead className="border-b border-zinc-700 text-zinc-500 text-xs md:text-sm">
        <tr>
          <th scope="col" className="font-medium">
            Market
          </th>
          <th scope="col" className="font-medium">
            Size
          </th>
          <th scope="col" className="font-medium">
            Net Value
          </th>
          <th scope="col" className=" font-medium">
            Collateral
          </th>
          <th scope="col" className=" font-medium">
            Entry Price
          </th>
          <th scope="col" className=" font-medium">
            Index Price
          </th>
          <th scope="col" className=" font-medium">
            PNL & ROE
          </th>
          <th scope="col" className=" font-medium">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="">
          <th className="text-xs font-medium">
            <div className="flex items-center gap-2">
              <img src={ETH} alt="img" className="w-6 h-6" />
              <div>
                <label>ETH/USDT</label>
                <div className="red-down">Short 10.0X</div>
              </div>
            </div>
          </th>
          <td className="text-xs font-medium">$49.9</td>
          <td className="text-xs font-medium">$4.9</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label>1.96 USDT</label>
              <label className="text-zinc-500">$1.96</label>
            </div>
          </td>
          <td className="text-xs font-medium">$1,884.9</td>
          <td className="text-xs font-medium">$2,001</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label className="green-up">+ $0.35</label>
              <label className="text-zinc-500">+ 6,16</label>
            </div>
          </td>
          <td className="text-xs font-medium">
            <button className="secondary-btn py-2 px-2">CLOSE</button>
          </td>
        </tr>
        <tr>
          <th className="text-xs font-medium">
            <div className="flex items-center gap-2">
              <img src={ETH} alt="img" className="w-6 h-6" />
              <div>
                <label>ETH/USDT</label>
                <div className="red-down">Short 10.0X</div>
              </div>
            </div>
          </th>
          <td className="text-xs font-medium">$49.9</td>
          <td className="text-xs font-medium">$4.9</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label>1.96 USDT</label>
              <label className="text-zinc-500">$1.96</label>
            </div>
          </td>
          <td className="text-xs font-medium">$1,884.9</td>
          <td className="text-xs font-medium">$2,001</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label className="green-up">+ $0.35</label>
              <label className="text-zinc-500">+ 6,16</label>
            </div>
          </td>
          <td className="text-xs font-medium">
            <button className="secondary-btn py-2 px-2">CLOSE</button>
          </td>
        </tr>
        <tr>
          <th className="text-xs font-medium">
            <div className="flex items-center gap-2">
              <img src={ETH} alt="img" className="w-6 h-6" />
              <div>
                <label>ETH/USDT</label>
                <div className="red-down">Short 10.0X</div>
              </div>
            </div>
          </th>
          <td className="text-xs font-medium">$49.9</td>
          <td className="text-xs font-medium">$4.9</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label>1.96 USDT</label>
              <label className="text-zinc-500">$1.96</label>
            </div>
          </td>
          <td className="text-xs font-medium">$1,884.9</td>
          <td className="text-xs font-medium">$2,001</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label className="green-up">+ $0.35</label>
              <label className="text-zinc-500">+ 6,16</label>
            </div>
          </td>
          <td className="text-xs font-medium">
            <button className="secondary-btn py-2 px-2">CLOSE</button>
          </td>
        </tr>
        <tr>
          <th className="text-xs font-medium">
            <div className="flex items-center gap-2">
              <img src={ETH} alt="img" className="w-6 h-6" />
              <div>
                <label>ETH/USDT</label>
                <div className="red-down">Short 10.0X</div>
              </div>
            </div>
          </th>
          <td className="text-xs font-medium">$49.9</td>
          <td className="text-xs font-medium">$4.9</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label>1.96 USDT</label>
              <label className="text-zinc-500">$1.96</label>
            </div>
          </td>
          <td className="text-xs font-medium">$1,884.9</td>
          <td className="text-xs font-medium">$2,001</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label className="green-up">+ $0.35</label>
              <label className="text-zinc-500">+ 6,16</label>
            </div>
          </td>
          <td className="text-xs font-medium">
            <button className="secondary-btn py-2 px-2">CLOSE</button>
          </td>
        </tr>
        <tr>
          <th className="text-xs font-medium">
            <div className="flex items-center gap-2">
              <img src={ETH} alt="img" className="w-6 h-6" />
              <div>
                <label>ETH/USDT</label>
                <div className="red-down">Short 10.0X</div>
              </div>
            </div>
          </th>
          <td className="text-xs font-medium">$49.9</td>
          <td className="text-xs font-medium">$4.9</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label>1.96 USDT</label>
              <label className="text-zinc-500">$1.96</label>
            </div>
          </td>
          <td className="text-xs font-medium">$1,884.9</td>
          <td className="text-xs font-medium">$2,001</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label className="green-up">+ $0.35</label>
              <label className="text-zinc-500">+ 6,16</label>
            </div>
          </td>
          <td className="text-xs font-medium">
            <button className="secondary-btn py-2 px-2">CLOSE</button>
          </td>
        </tr>
        <tr>
          <th className="text-xs font-medium">
            <div className="flex items-center gap-2">
              <img src={ETH} alt="img" className="w-6 h-6" />
              <div>
                <label>ETH/USDT</label>
                <div className="red-down">Short 10.0X</div>
              </div>
            </div>
          </th>
          <td className="text-xs font-medium">$49.9</td>
          <td className="text-xs font-medium">$4.9</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label>1.96 USDT</label>
              <label className="text-zinc-500">$1.96</label>
            </div>
          </td>
          <td className="text-xs font-medium">$1,884.9</td>
          <td className="text-xs font-medium">$2,001</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label className="green-up">+ $0.35</label>
              <label className="text-zinc-500">+ 6,16</label>
            </div>
          </td>
          <td className="text-xs font-medium">
            <button className="secondary-btn py-2 px-2">CLOSE</button>
          </td>
        </tr>
        <tr>
          <th className="text-xs font-medium">
            <div className="flex items-center gap-2">
              <img src={ETH} alt="img" className="w-6 h-6" />
              <div>
                <label>ETH/USDT</label>
                <div className="red-down">Short 10.0X</div>
              </div>
            </div>
          </th>
          <td className="text-xs font-medium">$49.9</td>
          <td className="text-xs font-medium">$4.9</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label>1.96 USDT</label>
              <label className="text-zinc-500">$1.96</label>
            </div>
          </td>
          <td className="text-xs font-medium">$1,884.9</td>
          <td className="text-xs font-medium">$2,001</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label className="green-up">+ $0.35</label>
              <label className="text-zinc-500">+ 6,16</label>
            </div>
          </td>
          <td className="text-xs font-medium">
            <button className="secondary-btn py-2 px-2">CLOSE</button>
          </td>
        </tr>
        <tr>
          <th className="text-xs font-medium">
            <div className="flex items-center gap-2">
              <img src={ETH} alt="img" className="w-6 h-6" />
              <div>
                <label>ETH/USDT</label>
                <div className="red-down">Short 10.0X</div>
              </div>
            </div>
          </th>
          <td className="text-xs font-medium">$49.9</td>
          <td className="text-xs font-medium">$4.9</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label>1.96 USDT</label>
              <label className="text-zinc-500">$1.96</label>
            </div>
          </td>
          <td className="text-xs font-medium">$1,884.9</td>
          <td className="text-xs font-medium">$2,001</td>
          <td className="text-xs font-medium">
            <div className="flex flex-col gap-y-1">
              <label className="green-up">+ $0.35</label>
              <label className="text-zinc-500">+ 6,16</label>
            </div>
          </td>
          <td className="text-xs font-medium">
            <button className="secondary-btn py-2 px-2">CLOSE</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ListPosition
