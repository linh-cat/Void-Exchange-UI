import React from "react"

const OrderList = () => {
  return (
    <div className="order-list h-full overflow-auto">
      <table className="w-full text-left">
        <thead className="text-xs border-b border-slate-700">
          <tr className="text-slate-400">
            <th scope="col" className="py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Market & Size
            </th>
            <th scope="col" className="px-6 py-3">
              Operation & Type
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Collateral
            </th>
            <th scope="col" className="px-6 py-3">
              Action
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

export default OrderList
