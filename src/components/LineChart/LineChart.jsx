import React from "react"
import { Line } from "react-chartjs-2"

const LineChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <label className="text-xs text-slate-500">BTC/USDT</label>
      <Line
        data={{
          labels: ["Jun", "Jul", "Aug", "Sep"],
          datasets: [
            {
              id: 1,
              data: [1, 50, 2, 100],
              tension: 0.4,
              backgroundColor: "#536BC7",
              borderColor: "#536BC7",
              pointRadius: 0
            }
          ]
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: false
              },
              grid: {
                display: false
              }
            },
            x: {
              beginAtZero: true,
              ticks: { display: false },
              grid: {
                display: false
              }
            }
          },
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  )
}

export default LineChart
