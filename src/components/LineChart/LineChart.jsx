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
                display: showGrid
              }
            },
            x: {
              beginAtZero: true,
              ticks: { display: showXaxis, color: "#fff" },
              grid: {
                display: showGrid
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
                // label: function(context) {
                //     let label = context.dataset.label || '';

                //     if (label) {
                //         label += ': ';
                //     }
                //     if (context.parsed.y !== null) {
                //         label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                //     }
                //     return label;
                // }
              }
            },
            legend: {
              position: "top",
              display: showLegend,
              onClick: (evt, legentItem, legend) => {
                const datasets = legend.legendItems.map((dataset, index) => {
                  return dataset.text
                })
                const index = datasets.indexOf(legentItem.text)
                if (legend.chart.isDatasetVisible(index)) {
                  legend.chart.hide(index)
                } else {
                  legend.chart.show(index)
                }
              },
              labels: {
                generateLabels: (chart) => {
                  let visibility = []
                  for (let i = 0; i < chart.data.datasets.length; i++) {
                    if (!chart.isDatasetVisible(i)) {
                      visibility.push(true)
                    } else {
                      visibility.push(false)
                    }
                  }
                  return chart.data.datasets.map((dataset, index) => ({
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    strokeStyle: dataset.backgroundColor,
                    fontColor: dataset.borderColor,
                    hidden: visibility[index]
                  }))
                }
              }
            }
          }
        }}
      />
    </div>
  )
}

export default LineChart
