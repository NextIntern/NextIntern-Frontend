"use client"

import { useQuery } from "@tanstack/react-query"
import { Modal, Table } from "antd"
import Link from "next/link"
import { useState } from "react"

import EvaluateInternForm from "../EvaluateInternForm"
import config from "@/config"
import { useParam } from "@/hooks"
import { internService } from "@/services"
import { Campaign, Intern } from "@/types"

export default function InternshipList() {
  const [internId, setInternId] = useState("")

  const universityId = useParam("universityId")

  const { data: interns } = useQuery({
    queryKey: ["interns"],
    queryFn: () => internService.getInternByUniversity(universityId),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredInternship = Array.isArray(interns)
    ? interns.filter((intern) => intern.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const columns = [
    { title: "No", dataIndex: "no", key: "no", render: (_: string, __: Intern, index: number) => index + 1 },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      render: (fullname: string, record: Intern) => (
        <Link href={`${config.routes.internEvlCriteriaList}?internId=${record.userId}`}>{fullname}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Campaign Name",
      dataIndex: "campaign",
      key: "campaign",
      render: (campaign: Campaign) => campaign?.campaignName,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: Intern) => (
        <span className="cursor-pointer text-primary" onClick={() => setInternId(record.userId)}>
          Evaluate
        </span>
      ),
    },
  ]

  return (
    <>
      <section className="container mx-auto px-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Internship</h2>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
                {filteredInternship?.length ?? 0} internships
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These internships has been created.</p>
          </div>
          <input
            className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
            placeholder="Search internship..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Link
            href={config.routes.internshipCreate}
            className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 hover:text-white focus:outline-none"
          >
            Add Internship
          </Link>
        </div>

        <div className="mt-8 flex flex-col overflow-x-auto">
          <Table dataSource={filteredInternship} columns={columns} />
        </div>
      </section>
      <Modal title="Basic Modal" open={!!internId} onOk={() => setInternId("")} onCancel={() => setInternId("")}>
        <EvaluateInternForm internId={internId} />
      </Modal>
    </>
  )
}
