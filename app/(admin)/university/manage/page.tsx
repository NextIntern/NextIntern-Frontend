"use client"

import "./styles.css"

import { Button, Tabs } from "antd"
import type { TabsProps } from "antd"
import { getCookie, setCookie } from "cookies-next"
import { useState } from "react"
import { MdArrowBack, MdChecklist, MdOutlineCampaign, MdOutlineSchool } from "react-icons/md"
import CampaignEvaluationList from "@/app/(admin)/campaign-evaluation/page"
import EvaluationFormList from "@/app/(admin)/evaluation-form/page"
import InternshipUniList from "@/app/(admin)/intern/page"
import CampaignList from "@/components/CampaignList"
import InternshipEvlList from "@/components/InternshipList"
import config from "@/config"
import { useParam } from "@/hooks"

const onChange = (key: string) => {
  // localStorage.setItem(config.localStorage.tab, key)
  setCookie(config.localStorage.tab, key)
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
          <Tabs items={campaignItems} type="card" />
        </>
      ) : (
        <CampaignList setCampaignId={setCampaignId} />
      ),
      icon: <MdOutlineCampaign />,
    },
  ]
  return (
    <Tabs
      items={items}
      type="card"
      onChange={onChange}
      // defaultActiveKey={localStorage.getItem(config.localStorage.tab) ?? "1"}
      defaultActiveKey={getCookie(config.localStorage.tab) ?? "1"}
    />
  )
}
