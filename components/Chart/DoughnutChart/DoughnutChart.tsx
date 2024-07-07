import { Doughnut } from "react-chartjs-2"

const DoughnutChart = () => {
  const data = {
    backgroundColor: ["rgb(2, 88, 255)", "rgb(249, 151, 0)", "rgb(255, 199, 0)", "rgb (32, 214, 152)"],
    labels: ["Event 1", "Event 2", "Event 3", "Event 4"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 300],
        backgroundColor: ["rgb(2, 88, 255)", "rgb(249, 151, 0)", "rgb(255, 199, 0)", "rgb(32, 214, 152)"],
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 3,
      },
    },
    cutout: 150,
  }
  return <Doughnut data={data} width={50} height={50} options={options} />
}

export default DoughnutChart
