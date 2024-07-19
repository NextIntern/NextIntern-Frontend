"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, Form, Row, Select, Input } from "antd"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { CampaignQuestionFormType } from "./CampaignQuestion.type"
import config from "@/config"
import { useParam } from "@/hooks"
import { campaignQuestionService, campaignService, internService } from "@/services"
import { Campaign, Intern } from "@/types"
import * as constants from "@/utils/constants"

const CampaignQuestionForm = () => {
  // Get campaigns
  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => campaignService.getCampaigns(),
    select: (data) => data.data.data.items,
  })
  //Get interns
  const {data: interns} = useQuery({
    queryKey: ["interns"],
    queryFn: () => internService.getInterns(),
    select: (data) => data.data.data.items,
  })
  // Get campaign evaluation id from query params
  const campaignQuestionId = useParam("campaignQuestionId",)

  // Get campaign evaluation by id
  const { data: campaignQuestion } = useQuery({
    queryKey: ["campaignQuestion"],
    queryFn: () => campaignQuestionService.getById(campaignQuestionId),
    select: (data) => data.data.data,
    enabled: !!campaignQuestionId,
  })

  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Populate form with campaign evaluation data
  useEffect(() => {
    if (!campaignQuestion || !campaignQuestionId) return

    form.setFieldsValue({
      
      campaignId: campaignQuestion.campaignQuestionId,
    })
  }, [campaignQuestion, campaignQuestionId, form])

  // Input class name
  const className =
    "h-[40px] focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  // Form submit handler
  const onFinish = async (values: CampaignQuestionFormType) => {
    const data = {
      ...values,
      id: campaignQuestionId,
      campaignId:values.campaign
    }

    try {
      if (campaignQuestionId) {
        await campaignQuestionService.update(data)
        toast.success("Campaign question updated successfully")
      } else {
        await campaignQuestionService.create(data)
        toast.success("Campaign question created successfully")
      }
      router.push(config.routes.campaignQuestionList)
    } catch (error) {
      toast.error("Failed to create campaign question")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "Intern",
      name: "internId",
      Input: (
        <Select
          options={interns?.map((interns: Intern) => ({
            value: interns.id,
            label: interns.username,
          }))}
        />
      ),
    },
    {
      label: "Question",
      name: "question",
      Input: <Input type="text" className={className} />,
    },
  
    {
      label: "Campaign",
      name: "campaignId",
      Input: (
        <Select
          options={campaigns?.map((campaign: Campaign) => ({
            value: campaign.campaignId,
            label: campaign.campaignName,
          }))}
        />
      ),
    },
  ]

  return (
    <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} layout="horizontal">
      <Row>
        {FORM_ELEMENTS.map((form) => (
          <Col sm={24} lg={12} key={form.name} className="mb-4">
            <Form.Item name={form.name} label={form.label}>
              {form.Input}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <div className="mt-8 flex justify-end">
        <button className="rounded-md bg-gradient-to-r from-primary to-secondary px-8 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none">
          {campaignQuestionId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default CampaignQuestionForm
