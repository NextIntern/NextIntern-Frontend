"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import config from "@/config"
import { evaluateInternService } from "@/services"
import { FormCriteria, InternEvaluation, InternEvaluationCriteria } from "@/types"

export default function Page() {
  const { data: internScores, refetch } = useQuery({
    queryKey: ["intern-scores"],
    queryFn: () => evaluateInternService.getAll(),
    select: (data) => data.data.data.items,
  })

  console.log(internScores)

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (internEvlId: string) => {
    try {
      await evaluateInternService.delete(internEvlId)
      toast.success("Deleted this evaluation successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete this evaluation.")
    }
  }

  const filteredInternScores = Array.isArray(internScores)
    ? internScores.filter((internScore) => internScore.internEvaluationDto.internName.includes(searchTerm))
    : []

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: InternEvaluationCriteria, index: number) => (
        <text className="font-bold">{index + 1}</text>
      ),
    },
    {
      title: "Intern Name",
      dataIndex: "internEvaluationDto",
      key: "internId",
      render: (internEvaluation: InternEvaluation) => internEvaluation.internName,
    },
    {
      title: "Form Criteria",
      dataIndex: "formCriteriaDto",
      key: "formCriteriaName",
      render: (formCriteria: FormCriteria) => formCriteria.name,
    },
    {
      title: "Feedback",
      dataIndex: "internEvaluationDto",
      key: "feedback",
      render: (internEvaluation: InternEvaluation) => internEvaluation.feedback,
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      sorter: (a: InternEvaluationCriteria, b: InternEvaluationCriteria) => a.score - b.score,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: InternEvaluationCriteria) => (
        <div className="flex items-center gap-2">
          <Link
            href={`${config.routes.internEvlCriteriaEdit}?internEvlCriteriaId=${record.internEvaluationCriteriaId}`}
            className="text-primary"
          >
            Edit
          </Link>
          <span className="cursor-pointer text-primary" onClick={() => handleDelete(record.internEvaluationCriteriaId)}>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Evaluate Internship</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {internScores?.length ?? 0} intern scores
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These intern scores has been created.</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          placeholder="Search intern evaluations..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link
          href={config.routes.internEvlCriteriaCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Intern Evaluation
        </Link>
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <Table dataSource={filteredInternScores} columns={columns} />
      </div>
    </section>
  )
}
