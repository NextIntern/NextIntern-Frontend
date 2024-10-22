"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import dayjs from "dayjs"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import config from "@/config"
import { campaignQuestionService } from "@/services"
import { CampaignQuestion } from "@/types"
import { DATE_TIME_FORMAT } from "@/utils/constants"

export default function Page() {
  const { data: campaignQuestion, refetch } = useQuery({
    queryKey: ["campaignQuestion"],
    queryFn: () => campaignQuestionService.getAll(),
    select: (data) => data.data.data,
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
    ? campaignQuestion.filter((campQues) => campQues.question.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: CampaignQuestion, index: number) => index + 1,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Created Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate: Date) => dayjs(createDate).format(DATE_TIME_FORMAT),
    },
    {
      title: "Modified Date",
      dataIndex: "modifyDate",
      key: "modifyDate",
      render: (modifyDate: Date) => dayjs(modifyDate).format(DATE_TIME_FORMAT),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: CampaignQuestion) => (
        <>
          <Link href={`${config.routes.campaignQuestionResponse}?campaignQuestionId=${record.campaignQuestionId}`}>
            Responses
          </Link>
          <span className="mx-2">|</span>
          <Link href={`${config.routes.campaignQuestionEdit}?campaignQuestionId=${record.campaignQuestionId}`}>
            Edit
          </Link>
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
          placeholder="Search campaign question..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link
          href={config.routes.campaignQuestionCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Campaign Question
        </Link>
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <Table dataSource={filteredCampaignQuestion} columns={columns} />
      </div>
    </section>
  )
}
