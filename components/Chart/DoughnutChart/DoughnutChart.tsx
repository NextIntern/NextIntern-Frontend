import { useQuery } from "@tanstack/react-query"
import { Doughnut } from "react-chartjs-2"
import { dashboardService } from "@/services"

const DoughnutChart = () => {
  // Get all reports
  const { data: interns } = useQuery({
    queryKey: ["interns"],
    queryFn: () => dashboardService.countIntern(),
    select: (data) => data.data.data,
  })

  const colors = [
    "rgb(0, 88, 255)",
    "rgb(249, 151, 0)",
    "rgb(255, 199, 0)",
    "rgb(32, 214, 152)",
    // "rgb(255, 0, 0)",
    // "rgb(0, 255, 0)",
    // "rgb(0, 0, 255)",
    // "rgb(255, 255, 0)",
    // "rgb(255, 0, 255)",
    // "rgb(0, 255, 255)",
  ]

  const START_INDEX = 0
  const MAX_NUMBER = 4

  const data = {
    backgroundColor: colors,
    labels: interns?.map((intern) => intern.university).slice(START_INDEX, MAX_NUMBER),
    datasets: [
      {
        label: "My First Dataset",
        data: interns?.map((intern) => intern.count).slice(START_INDEX, MAX_NUMBER),
        backgroundColor: colors,
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
    cutout: 75,
  }
  return <Doughnut data={data} width={50} height={50} options={options} />
}

export default DoughnutChart
