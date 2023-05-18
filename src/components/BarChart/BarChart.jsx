import React from "react"
import { Bar } from "react-chartjs-2"
const labels = ["January", "February", "March", "April", "May", "June", "July"]

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: [10, 20, 30, 40, 50, 60, 70, 80],
      backgroundColor: "#408FFF"
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
              display: false,
              text: "Chart.js Bar Chart"
            }
          }
        }}
        data={chartData || data}
      />
    </div>
  )
}

export default BarChart
