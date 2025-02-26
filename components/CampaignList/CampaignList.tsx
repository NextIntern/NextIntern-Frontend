"use client"

import { useQuery } from "@tanstack/react-query"
import { Table } from "antd"
import { setCookie } from "cookies-next"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import config from "@/config"
import { useParam } from "@/hooks"
import campaignService from "@/services/campaign.service"
import { Campaign } from "@/types"

function CampaignList({ setCampaignId }: { setCampaignId: React.Dispatch<React.SetStateAction<string>> }) {
  const universityId = useParam("universityId")

  const { data: campaigns, refetch } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => campaignService.getCampaignByUniversity(universityId),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (campaignId: string) => {
    try {
      await campaignService.deleteCampaign(campaignId)
      toast.success("Campaign deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete campaign.")
    }
  }

  const filteredCampaigns = Array.isArray(campaigns)
    ? campaigns.filter((campaign) => campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: Campaign, index: number) => index + 1,
    },
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
      render: (campaignName: string, record: Campaign) => (
        <span
          className="cursor-pointer text-primary"
          onClick={() => {
            setCampaignId(record.campaignId)
            setCookie("campaignId", record.campaignId)
          }}
        >
          {campaignName}
        </span>
      ),
    },
    {
      title: "University",
      dataIndex: "universityName",
      key: "universityName",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a: Campaign, b: Campaign) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a: Campaign, b: Campaign) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    },
    {
      title: "State",
      dataIndex: "campaignState",
      key: "campaignState",
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: Campaign) => (
        <>
          <Link href={`${config.routes.campaignEdit}?campaignId=${record.campaignId}`} className="text-primary">
            Edit
          </Link>
          <span className="mx-2">|</span>
          <span className="cursor-pointer text-primary" onClick={() => handleDelete(record.campaignId)}>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Campaign</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {campaigns?.length ?? 0} campaigns
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These campaigns has been created.</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          name="campaignName"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link
          href={config.routes.campaignCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 hover:text-white focus:outline-none"
        >
          Add Campaign
        </Link>
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <Table dataSource={filteredCampaigns} columns={columns} />
      </div>
    </section>
  )
}

export default CampaignList
