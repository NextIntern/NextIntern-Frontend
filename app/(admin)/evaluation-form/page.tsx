"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import config from "@/config"
import { evaluationFormService } from "@/services"
import { EvaluationForm, University } from "@/types"

export default function Page() {
  const { data: evaluationForms, refetch } = useQuery({
    queryKey: ["evaluationForms"],
    queryFn: () => evaluationFormService.getEvaluationForms(),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (evaluationFormId: string) => {
    try {
      await evaluationFormService.deleteEvaluationForm(evaluationFormId)
      toast.success("Evaluation form deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete evaluation form.")
    }
  }

  const filteredEvaluationForms = Array.isArray(evaluationForms)
    ? evaluationForms.filter((evaluationForm) =>
        evaluationForm.university.universityName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: EvaluationForm, index: number) => <text className="font-bold">{index + 1}</text>,
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
      render: (university: University) => <text className="font-bold">{university?.universityName}</text>,
    },
    {
      title: "Created Date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Modified Date",
      dataIndex: "modifyDate",
      key: "modifyDate",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <span style={{ color: isActive ? "blue" : "silver" }}>{isActive ? "Active" : "Inactive"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: EvaluationForm) => (
        <>
          <Link href={`${config.routes.evaluationFormEdit}?evaluationFormId=${record.evaluationFormId}`}>Edit</Link>
          <span className="mx-2">|</span>
          <span className="cursor-pointer text-primary" onClick={() => handleDelete(record.evaluationFormId)}>
            Delete
          </span>
        </>
      ),
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Evaluation Form</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {filteredEvaluationForms?.length ?? 0} evaluation forms
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These evaluation forms has been created.</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          placeholder="Search evaluation forms..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* <Link
          href={config.routes.evaluationFormCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Evaluation Form
        </Link> */}
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <Table dataSource={filteredEvaluationForms} columns={columns} />
      </div>
    </section>
  )
}
