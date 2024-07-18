"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
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
import DoughnutChart from "@/components/Chart/DoughnutChart"
import { dashboardService } from "@/services"

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

const icons = [
  <MdOutlinePeopleAlt key="people" />,
  <MdOutlineSchool key="school" />,
  <MdOutlineLibraryAddCheck key="library" />,
  <MdOutlineCampaign key="campaign" />,
]

export default function Page() {
  // Get all reports
  const { data: reports } = useQuery({
    queryKey: ["reports"],
    queryFn: () => dashboardService.getItems(),
    select: (data) => data.data.data,
  })

  // Get top 5 interns
  const { data: interns } = useQuery({
    queryKey: ["top-intern"],
    queryFn: () => dashboardService.getFiveMostIntern(),
    select: (data) => data.data.data,
  })

  console.log(interns)

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "internId",
      key: "internId",
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
  ]

  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard Page</h1>
      <div className="mt-6">
        <div className="mb-6 grid grid-cols-4 gap-6">
          {reports?.map((report, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                {icons[index]} <span>{report.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-semibold">{report.total}</span>
                <span
                  className={`flex items-center gap-2 rounded-full px-2 font-semibold ${
                    report.isIncrease ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                  }`}
                >
                  {report.isIncrease ? <MdOutlineTrendingUp /> : <MdOutlineTrendingDown />} {report.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Top 5 internships</h2>
            <Table dataSource={interns} columns={columns} />
            {/* <BarChart /> */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">University Report</h2>
              <p className="text-slate-400">Total student with the amount in school</p>
            </div>
            <DoughnutChart />
          </div>
          {/* <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
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
          </div> */}
        </div>
      </div>
    </>
  )
}
