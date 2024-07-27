import { useQuery } from "@tanstack/react-query"
import { Doughnut } from "react-chartjs-2"
import { dashboardService } from "@/services"
import { CHART_COLORS } from "@/utils/constants"

const DoughnutChart = () => {
  // Get all reports
  const { data: interns } = useQuery({
    queryKey: ["interns"],
    queryFn: () => dashboardService.countIntern(),
    select: (data) => data.data.data,
  })

  const START_INDEX = 0
  const MAX_NUMBER = 4

  const data = {
    backgroundColor: CHART_COLORS,
    labels: interns
      ?.sort((a, b) => b.count - a.count)
      ?.map((intern) => intern.university)
      .slice(START_INDEX, MAX_NUMBER),
    datasets: [
      {
        label: "My First Dataset",
        data: interns
          ?.sort((a, b) => b.count - a.count)
          ?.map((intern) => intern.count)
          .slice(START_INDEX, MAX_NUMBER),
        backgroundColor: CHART_COLORS,
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
