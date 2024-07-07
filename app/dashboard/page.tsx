"use client"

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"

import BarChart from "@/components/Chart/BarChart"
import DoughnutChart from "@/components/Chart/DoughnutChart"
import LineChart from "@/components/Chart/LineChart"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
)

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard Page</h1>
      <div className="my-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <LineChart />
          </div>
          <div>
            <LineChart />
          </div>
          <div>
            <LineChart />
          </div>
          <div className="col-span-2 max-h-[28rem]">
            <BarChart />
          </div>
          <div>
            <DoughnutChart />
          </div>
        </div>
      </div>
    </>
  )
}
