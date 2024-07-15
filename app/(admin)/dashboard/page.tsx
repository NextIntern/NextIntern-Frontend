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

import {
  MdOutlineCampaign,
  MdOutlineLibraryAddCheck,
  MdOutlinePeopleAlt,
  MdOutlineSchool,
  MdOutlineTrendingDown,
  MdOutlineTrendingUp,
} from "react-icons/md"
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

const DASHBOARD_DATA = [
  {
    icon: <MdOutlinePeopleAlt />,
    title: "Total Internship",
    total: 120,
    percentage: 20,
    isIncrease: true,
  },
  {
    icon: <MdOutlineSchool />,
    title: "Total University",
    total: 8,
    percentage: 15,
    isIncrease: false,
  },
  {
    icon: <MdOutlineLibraryAddCheck />,
    title: "Total Evaluation Form",
    total: 1200,
    percentage: 30,
    isIncrease: true,
  },
  {
    icon: <MdOutlineCampaign />,
    title: "Total Campaign",
    total: 480,
    percentage: 5,
    isIncrease: true,
  },
]

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard Page</h1>
      <div className="my-6">
        <div className="mb-6 grid grid-cols-4 gap-6">
          {DASHBOARD_DATA.map((data, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                {data.icon} <span>{data.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-semibold">{data.total}</span>
                <span
                  className={`flex items-center gap-2 rounded-full px-2 font-semibold text-white ${
                    data.isIncrease ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                  }`}
                >
                  {data.isIncrease ? <MdOutlineTrendingUp /> : <MdOutlineTrendingDown />} {data.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 max-h-[28rem] rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Total Student</h2>
            <BarChart />
          </div>
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Total Student</h2>
              <p className="text-slate-400">Total student with the amount in school</p>
            </div>
            <DoughnutChart />
          </div>
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Total Student</h2>
            <LineChart />
          </div>
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Total Student</h2>
            <LineChart />
          </div>
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Total Student</h2>
            <LineChart />
          </div>
        </div>
      </div>
    </>
  )
}
