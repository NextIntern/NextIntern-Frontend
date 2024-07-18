"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import config from "@/config"
import { campaignEvaluationService } from "@/services"
import { CampaignEvaluation } from "@/types"

export default function Page() {
  const { data: campaignEvaluations, refetch } = useQuery({
    queryKey: ["campaignEvaluations"],
    queryFn: () => campaignEvaluationService.getCampaignEvaluations(),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (campaignId: string) => {
    try {
      await campaignEvaluationService.deleteCampaignEvaluation(campaignId)
      toast.success("Campaign evaluation deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete campaign evaluation.")
    }
  }

  const filteredCampaigns = Array.isArray(campaignEvaluations)
    ? campaignEvaluations.filter((campaignEvaluation) =>
        campaignEvaluation.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const columns = [
    {
      title: "Campaign Evaluation ID",
      dataIndex: "campaignEvaluationId",
      key: "campaignEvaluationId",
    },
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: CampaignEvaluation) => (
        <div className="flex gap-2">
          <Link
            href={`${config.routes.campaignEvlEdit}?campaignEvaluationId=${record.campaignEvaluationId}`}
            className="text-primary"
          >
            Edit
          </Link>
          <span className="cursor-pointer text-primary" onClick={() => handleDelete(record.campaignEvaluationId)}>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Campaign Evaluation</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {campaignEvaluations?.length ?? 0} campaign evaluations
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These campaign evaluations has been created.</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          name="campaignName"
          placeholder="Search campaign evaluations..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* <Link
          href={config.routes.campaignEvlCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Campaign Evaluation
        </Link> */}
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <Table dataSource={filteredCampaigns} columns={columns} />
      </div>
    </section>
  )
}
