import React from "react"

const LatestTrade = () => {
  return (
    <div className="shadow-md latest-trade">
      <table className="text-left text-xs w-full">
        <thead className="">
          <tr className="border">
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="border-b">
            <th scope="row" className="px-6 py-4 green-up">
              178.2
            </th>
            <td className="px-6 py-4">$2.7622</td>
            <td className="px-6 py-4 underline">5h ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default LatestTrade
