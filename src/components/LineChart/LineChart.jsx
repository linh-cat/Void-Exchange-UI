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
  showLegend = true,
  optionsConfig = {},
  label = "",
  yAxisFormatter,
  customTooltip = {}
}) => {
  return (
    <div className="chart-container">
      <label className="text-xs">{label}</label>
      <Line
        data={chartData}
        options={{
          ...optionsConfig,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: showYaxis,
                color: "#fff",
                callback: yAxisFormatter
                // callback function (value, index, values) => format
              },
              grid: {
                display: showGrid,
                color: "#373B47"
              }
            },
            x: {
              beginAtZero: true,
              ticks: { display: showXaxis, color: "#fff" },
              grid: {
                display: showGrid,
                color: "#373B47"
              }
            }
          },
          responsive: true,
          plugins: {
            tooltip: {
              enabled: showTooltip,
              callbacks: {
                ...customTooltip
                // rest of property
              }
            },
            legend: {
              position: "top",
              display: showLegend
            }
          }
        }}
      />
    </div>
  )
}

export default LineChart
