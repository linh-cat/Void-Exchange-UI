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
    headerName: "Name",
    cellRenderer: (val) => {
      return val
    },
    formatter: (val) => {
      return val
    },
    className: "",
    headerClassName: ""
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

const TableCustom = ({
  columnDef = columnDefEx,
  data = dataTest,
  isShadow = false,
  cellStyle = "",
  isBorderHeader,
  headerClassName
}) => {
  return (
    <div
      className={cx({
        "w-full rounded": true,
        shadow: isShadow
      })}
    >
      <div className="w-full overflow-x-auto no-scrollbar">
        <table className="w-full">
          <thead>
            <tr className={cx("tracking-wide border-b text-slate-500")}>
              {columnDef.map((item) => (
                <th className={cx("py-1", item.headerClassName, headerClassName)} key={item?.field}>
                  <p className={cx("font-normal", { "border-b": isBorderHeader })}>{item?.headerName}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data.map((item) => (
              <tr className="text-center" key={item?.id}>
                {columnDef.map((h) => {
                  if (h.cellRenderer) {
                    return (
                      <td className={cx(cellStyle, h.className)} key={h.field}>
                        {h.cellRenderer(item)}
                      </td>
                    )
                  }
                  if (h.formatter) {
                    return (
                      <td className={cx(cellStyle, h.className)} key={h.field}>
                        {h.formatter(item)}
                      </td>
                    )
                  }
                  return (
                    <td className={cx(cellStyle, h.className)} key={h.field}>
                      {item?.[h?.field]}
                    </td>
                  )
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
