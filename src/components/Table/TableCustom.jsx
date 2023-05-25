import React from "react"
import cx from "classnames"

// we must define header match with data
const dataTest = [
  {
    name: "test",
    age: "test",
    status: "test",
    date: "hi",
    gen: "N"
  }
]
const columnDefEx = [
  {
    field: "name",
    headerName: "Name"
  },
  {
    field: "age",
    headerName: "Age"
  },
  {
    field: "status",
    headerName: "Status"
  },
  {
    field: "date",
    headerName: "Date"
  },
  {
    field: "gen",
    headerName: "Gen"
  }
]

const TableCustom = ({ columnDef = columnDefEx, data = dataTest, isShadow = false }) => {
  return (
    <div
      className={cx({
        "w-full mb-8 overflow-hidden rounded": true,
        shadow: isShadow
      })}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="tracking-wide text-left border-b text-zinc-500">
              {columnDef.map((item) => (
                <th className="px-4 py-1">
                  <p className="font-normal">{item?.headerName}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data.map((item) => (
              <tr className="" key={item}>
                {columnDef.map((h) => {
                  if (h.cellRenderer) {
                    return <td className="px-4 py-3 text-sm">{h.cellRenderer(item)}</td>
                  }
                  return <td className="px-4 py-3 text-sm">{item?.[h?.field]}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableCustom
