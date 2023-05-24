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

const Table = ({ columnDef = columnDefEx, data = dataTest, isShadow = false }) => {
  return (
    <section className="container mx-auto">
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
                  <th className="px-4 py-3">{item?.headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {data.map((item) => (
                <tr className="" key={item}>
                  {columnDef.map((h) => (
                    <td className="px-4 py-3 text-sm">{item?.[h?.field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Table
