import React from "react"
import { Line } from "react-chartjs-2"
// data for chart
// {
//     labels: ["Jun", "Jul", "Aug", "Sep"],
//     datasets: [
//       {
//         id: 1,
//         data: [1, 50, 2, 100],
//         tension: 0.4,
//         backgroundColor: "#536BC7",
//         borderColor: "#536BC7",
//         pointRadius: 0,
//         the rest props...
//       }
//     ]
//   }
const LineChart = ({
  chartData,
  showXaxis = true,
  showYaxis = true,
  showGrid = true,
  showTooltip = true,
  showLegend = true
}) => {
  return (
    <div className="chart-container">
      <label className="text-xs text-slate-500">BTC/USDT</label>
      <Line
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: showYaxis
              },
              grid: {
                display: showGrid
              }
            },
            x: {
              beginAtZero: true,
              ticks: { display: showXaxis },
              grid: {
                display: false
              }
            }
          },
          responsive: true,
          plugins: {
            tooltip: {
              enabled: showTooltip
            },
            legend: {
              display: showLegend
            }
          }
        }}
      />
    </div>
  )
}

export default LineChart
