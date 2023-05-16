import React from "react"
import "./DetailVaultPage.css"
import LineChart from "@components/LineChart/LineChart"

const DetailVaultPage = () => {
  const yAxisFormatter = (value, index, values) => {
    console.log({ value, index, values })
    return value
  }
  const customTooltip = () => {
    return {}
  }
  return (
    <div className="vault-detail">
      <div
        style={{
          width: "700px",
          height: "700px"
        }}
      >
        <LineChart
          chartData={{
            labels: ["Jun", "Jul", "Aug", "Sep"],
            datasets: [
              {
                label: "test1",
                id: 1,
                data: [1, 50, 2, 100],
                tension: 0.1,
                backgroundColor: "yellow",
                borderColor: "yellow",
                pointRadius: 0
                // the rest props...
              },
              {
                id: 1,
                label: "test2",
                data: [10, 20, 14, 90],
                tension: 0.1,
                backgroundColor: "red",
                borderColor: "red",
                pointRadius: 0
                // the rest props...
              }
            ]
          }}
          yAxisFormatter={yAxisFormatter}
          customTooltip={customTooltip}
        />
      </div>
    </div>
  )
}

export default DetailVaultPage
