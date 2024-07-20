"use client"

import "./styles.css"

import { Button, Tabs } from "antd"
import type { TabsProps } from "antd"
import { useState } from "react"
import { MdArrowBack, MdChecklist, MdOutlineCampaign, MdOutlineSchool } from "react-icons/md"
import CampaignList from "@/app/(admin)/campaign/page"
import CampaignEvaluationList from "@/app/(admin)/campaign-evaluation/page"
import EvaluationFormList from "@/app/(admin)/evaluation-form/page"
import InternshipUniList from "@/app/(admin)/intern/page"
import InternshipEvlList from "@/components/InternshipList"
import { useParam } from "@/hooks"

const onChange = (key: string) => {
  console.log(key)
}

export default function Page() {
  const [campaignId, setCampaignId] = useState("")
  const universityId = useParam("universityId")
  console.log(universityId, campaignId)

  const campaignItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Campaign Evaluation",
      children: <CampaignEvaluationList />,
      icon: <MdOutlineSchool />,
    },
    {
      key: "2",
      label: "Internship by Campaign",
      children: <InternshipEvlList />,
      icon: <MdOutlineSchool />,
    },
  ]

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Internship by University",
      children: <InternshipUniList />,
      icon: <MdOutlineSchool />,
    },
    {
      key: "2",
      label: "Evaluation Form",
      children: <EvaluationFormList />,
      icon: <MdChecklist />,
    },
    {
      key: "3",
      label: "Campaign",
      children: campaignId ? (
        <>
          <Button onClick={() => setCampaignId("")} icon={<MdArrowBack />}>
            Back
          </Button>
          <Tabs items={campaignItems} type="card" onChange={onChange} />
        </>
      ) : (
        <CampaignList setCampaignId={setCampaignId} />
      ),
      icon: <MdOutlineCampaign />,
    },
  ]
  return <Tabs items={items} type="card" onChange={onChange} />
}
