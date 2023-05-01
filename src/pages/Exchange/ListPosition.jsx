import React from "react"

const ListPosition = () => {
  return (
    <div className="postion-list overflow-x-auto">
      <table className="w-full text-left ">
        <thead className="text-xs border-b border-slate-700 overflow-auto w-full">
          <tr className="text-slate-400">
            <th scope="col" className="py-3">
              Market
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Net Value
            </th>
            <th scope="col" className="px-6 py-3">
              Collateral
            </th>
            <th scope="col" className="px-6 py-3">
              Entry Price
            </th>
            <th scope="col" className="px-6 py-3">
              Index Price
            </th>
            <th scope="col" className="px-6 py-3">
              Liq.Price
            </th>
            <th scope="col" className="px-6 py-3">
              PNL.ROE
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          <tr className="">
            <th scope="row" className="py-4 ">
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ListPosition
