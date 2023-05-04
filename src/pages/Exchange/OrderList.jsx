import React from "react"

const OrderList = () => {
  return (
    <table className="w-full">
      <thead className="border-b border-zinc-700 text-zinc-500 text-xs md:text-sm">
        <tr>
          <th scope="col" className="font-medium">
            Time
          </th>
          <th scope="col" className="font-medium">
            Market & Side
          </th>
          <th scope="col" className="font-medium">
            Operation & Type
          </th>
          <th scope="col" className=" font-medium">
            Price
          </th>
          <th scope="col" className=" font-medium">
            Amount
          </th>
          <th scope="col" className=" font-medium">
            Collateral
          </th>
          <th scope="col" className=" font-medium">
            Actions
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
        </tr>
      </tbody>
    </table>
  )
}

export default OrderList
