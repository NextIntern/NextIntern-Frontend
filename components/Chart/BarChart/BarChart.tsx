import { Bar } from "react-chartjs-2"

const BarChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "May", "May", "May", "May"],
    datasets: [
      {
        label: "Brutto",
        borderRadius: 30,
        data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3, 0.4],
        backgroundColor: "rgba(32, 214, 155, 1)",
        barThickness: 10,
      },
      {
        label: "Netto",
        borderRadius: 20,
        data: [0.07, 0.3, 0.15, 0.2, 0.5, 0.3, 0.8, 0.2, 0.4],
        backgroundColor: "rgba(1, 98, 255, 1)",
        barThickness: 10,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        // position: "center",
        // align: "start",
        labels: {
          boxWidth: 7,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        max: 1,
      },
    },
    elements: {
      bar: {
        // barPercentage: 0.3,
        // categoryPercentage: 1,
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default BarChart
