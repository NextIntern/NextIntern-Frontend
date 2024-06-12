"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

import config from "@/config"
import campaignService from "@/services/campaign.service"
import { Campaign } from "@/types"

const headerName = ["Campaign ID", "Campaign Name", "University", "Start Date", "End Date"]
const viewData: (keyof Campaign)[] = ["campaignId", "campaignName", "universityName", "startDate", "endDate"]

export default function Page() {
  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => campaignService.getCampaigns(),
    select: (data) => data.data.data,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredCampaigns = Array.isArray(campaigns)
    ? campaigns.filter((campaign) => campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  return (
    <section className="container mx-auto px-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Campaign</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600 dark:bg-gray-800 dark:text-blue-400">
              {campaigns?.length} campaigns
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
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Campaign
        </Link>
      </div>

      <div className="mt-8 flex flex-col">
  <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg" style={{ maxHeight: '500px' }}>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {headerName.map((name) => (
                    <th
                      key={name}
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-500 rtl:text-right dark:text-gray-400"
                    >
                      {name}
                    </th>
                  ))}
                  <th className="relative px-4 py-3.5">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.campaignId}>
                    {viewData.map((data) => (
                      <td key={data} className="whitespace-nowrap p-4 text-sm">
                        <div>
                          <h4 className="text-gray-700 dark:text-gray-200">{String(campaign[data])}</h4>
                        </div>
                      </td>
                    ))}

                    <td className="whitespace-nowrap p-4 text-sm">
                      <Link
                        href={`${config.routes.campaignEdit}?campaignId=${campaign.campaignId}`}
                        className="text-primary"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {filteredCampaigns.length === 0 && (
      <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-200">No campaigns found.</div>
    )}
  </div>
</div>
      <div className="mt-6 flex items-center justify-between">
        <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Previous
        </button>
        <div className="flex items-center space-x-2">
          <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">1</button>
          <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">2</button>
          <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">3</button>
        </div>
        <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Next</button>
      </div>
    </section>
  )
}
