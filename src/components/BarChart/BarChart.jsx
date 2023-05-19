import React from "react"
import { Bar } from "react-chartjs-2"
const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: [10, 20, 30, 40, 50, 60, 70, 80, 40, 30, 70, 90],
      backgroundColor: "#408FFF",
      borderRadius: 10
    }
  ]
}
const BarChart = ({
  showYaxis = true,
  showGrid = true,
  showXaxis = true,
  showLegend = true,
  chartData,
  label,
  labelForChart = "",
  customTooltip
}) => {
  return (
    <div>
      <label>{label}</label>
      <Bar
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: showYaxis,
                color: "#fff"
              },
              grid: {
                display: showGrid
              }
            },
            x: {
              beginAtZero: true,
              ticks: {
                display: showXaxis,
                color: "#fff"
              },
              grid: {
                display: showGrid
              }
            }
          },
          plugins: {
            legend: {
              display: showLegend,
              position: "top"
            },
            tooltip: {
              yAlign: "bottom",
              backgroundColor: "#2A3341",
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
            title: {
              display: true,
              text: labelForChart,
              color: "#fff"
            }
          }
        }}
        data={chartData || data}
      />
    </div>
  )
}

export default BarChart
