"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import config from "@/config"
import { campaignQuestionService } from "@/services"
import { CampaignQuestion, Intern } from "@/types"

export default function Page() {
  const { data: campaignQuestion, refetch } = useQuery({
    queryKey: ["campaignQuestion"],
    queryFn: () => campaignQuestionService.getAll(),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (campaignQuestionId: string) => {
    try {
      await campaignQuestionService.delete(campaignQuestionId)
      toast.success("Campaign question deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete campaign question.")
    }
  }

  const filteredCampaignQuestion = Array.isArray(campaignQuestion)
    ? campaignQuestion.filter((campaignQuestion) =>
        campaignQuestion.campaignQuestionId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: CampaignQuestion, index: number) => index + 1,
    },
    {
      title: "Intern",
      dataIndex: "username",
      key: "username",
      render: (intern: Intern) => intern?.username,
    },
    {
      title: "Created Date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
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
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: CampaignQuestion) => (
        <>
          <Link href={`${config.routes.evaluationFormEdit}?evaluationFormId=${record.campaignQuestionId}`}>Edit</Link>
          <span className="mx-2">|</span>
          <span className="cursor-pointer text-primary" onClick={() => handleDelete(record.campaignQuestionId)}>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Campaign Questions</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {filteredCampaignQuestion?.length ?? 0} campaign questions
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These campaign question has been created.</p>
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
        <Table dataSource={filteredCampaignQuestion} columns={columns} />
      </div>
    </section>
  )
}
