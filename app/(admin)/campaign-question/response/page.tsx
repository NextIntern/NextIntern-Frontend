"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import { useState } from "react"
import toast from "react-hot-toast"

import { useParam } from "@/hooks"
import { internService, questionResponseService } from "@/services"
import { CampaignQuestionResponse } from "@/types"

export default function Page() {
  const campaignQuestionId = useParam("campaignQuestionId")

  const { data: responses, refetch } = useQuery({
    queryKey: ["responses"],
    queryFn: () => questionResponseService.getAll(),
    select: (data) => data.data.data.filter((response) => response.campaignQuestionId === campaignQuestionId),
  })

  const { data: interns } = useQuery({
    queryKey: ["interns"],
    queryFn: () => internService.getInterns(),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (campaignQuestionId: string) => {
    try {
      await questionResponseService.delete(campaignQuestionId)
      toast.success("Response deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete response.")
    }
  }

  const filteredCampaignQuestion = Array.isArray(responses)
    ? responses?.filter((res) => res?.response.includes(searchTerm.toLowerCase()))
    : []

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: CampaignQuestionResponse, index: number) => index + 1,
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Intern Name",
      dataIndex: "internId",
      key: "internId",
      render: (internId: string) => interns?.find((intern) => intern.userId === internId)?.fullname,
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: CampaignQuestionResponse) => (
        <>
          {/* <Link href={`${config.routes.campaignQuestionEdit}?campaignQuestionId=${record.campaignQuestionId}`}>
            Edit
          </Link>
          <span className="mx-2">|</span> */}
          <span className="cursor-pointer text-primary" onClick={() => handleDelete(record.campaignQuestionResponseId)}>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Question Responses</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {filteredCampaignQuestion?.length ?? 0} responses
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            These campaign question responses has been created.
          </p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          placeholder="Search campaign question..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* <Link
          href={config.routes.campaignQuestionCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Campaign Question
        </Link> */}
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <Table dataSource={filteredCampaignQuestion} columns={columns} />
      </div>
    </section>
  )
}
