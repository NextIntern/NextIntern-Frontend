"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import config from "@/config"
import { internEvaluationService } from "@/services"
import { InternEvaluation } from "@/types"

export default function Page() {
  const { data: internEvls, refetch } = useQuery({
    queryKey: ["internEvls"],
    queryFn: () => internEvaluationService.getInternEvls(),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (internEvlId: string) => {
    try {
      await internEvaluationService.deleteInternEvl(internEvlId)
      toast.success("Intern evaluation deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete intern evaluation.")
    }
  }

  const filteredInternEvls = Array.isArray(internEvls)
    ? internEvls.filter((internEvl) => internEvl.internName.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: InternEvaluation, index: number) => <text className="font-bold">{index + 1}</text>,
    },
    {
      title: "Intern Full Name",
      dataIndex: "internName",
      key: "internName",
    },
    // {
    //   title: "Campaign Evaluation ID",
    //   dataIndex: "campaignEvaluationId",
    //   key: "campaignEvaluationId",
    // },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: InternEvaluation) => (
        <div className="flex items-center gap-2">
          <Link
            href={`${config.routes.internEvlEdit}?internEvaluationId=${record.internEvaluationId}`}
            className="text-primary"
          >
            Edit
          </Link>
          <span className="cursor-pointer text-primary" onClick={() => handleDelete(record.internEvaluationId)}>
            Delete
          </span>
        </div>
      ),
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Intern Evaluation</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {internEvls?.length ?? 0} intern evaluations
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These intern evaluations has been created.</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          placeholder="Search intern evaluations..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link
          href={config.routes.internEvlCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Intern Evaluation
        </Link>
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <Table dataSource={filteredInternEvls} columns={columns} />
      </div>
    </section>
  )
}
