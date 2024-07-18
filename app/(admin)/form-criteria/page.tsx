"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import config from "@/config"
import formCriteriaService from "@/services/form-criteria.service"
import { FormCriteria } from "@/types"

export default function Page() {
  const { data: formCriterias, refetch } = useQuery({
    queryKey: ["formCriterias"],
    queryFn: () => formCriteriaService.getFormCriterias(),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (formCriteriaId: string) => {
    try {
      await formCriteriaService.deleteFormCriteria(formCriteriaId)
      toast.success("Form criteria deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete form criteria.")
    }
  }

  const filteredFormCriterias = Array.isArray(formCriterias)
    ? formCriterias.filter((formCriteria) => formCriteria.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: FormCriteria, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Guide",
      dataIndex: "guide",
      key: "guide",
    },
    {
      title: "Min Score",
      dataIndex: "minScore",
      key: "minScore",
    },
    {
      title: "Max Score",
      dataIndex: "maxScore",
      key: "maxScore",
    },
    {
      title: "Evaluation Form",
      dataIndex: "universityName",
      key: "evaluationFormId",
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: FormCriteria) => (
        <span>
          <Link href={`${config.routes.formCriteriaEdit}?formCriteriaId=${record.formCriteriaId}`}>Edit</Link>
          <span className="mx-2">|</span>
          <span className="cursor-pointer text-primary" onClick={() => handleDelete(record.formCriteriaId)}>
            Delete
          </span>
        </span>
      ),
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Form Criteria</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {formCriterias?.length ?? 0} form criterias
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These form criterias has been created.</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          placeholder="Search form criteria..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link
          href={config.routes.formCriteriaCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Form Criteria
        </Link>
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <Table dataSource={filteredFormCriterias} columns={columns} />
      </div>
    </section>
  )
}
