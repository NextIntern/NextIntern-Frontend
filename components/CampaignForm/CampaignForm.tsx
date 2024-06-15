"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import dayjs from "dayjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { CampaignFormType } from "./CampaignForm.type"
import config from "@/config"
import { campaignService, universityService } from "@/services"
import { University } from "@/types"

const CampaignForm = () => {
  // Get universities
  const { data: universities } = useQuery({
    queryKey: ["university"],
    queryFn: () => universityService.getUniversities(),
    select: (data) => data.data.data,
  })

  // Get campaign id from query params
  const searchParams = useSearchParams()
  const campaignId = searchParams.get("campaignId") ?? ""

  // Get campaign by id
  const { data: campaign } = useQuery({
    queryKey: ["campaign"],
    queryFn: () => campaignService.getCampaignById(campaignId),
    select: (data) => data.data.data,
  })

  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Populate form with campaign data
  useEffect(() => {
    if (!campaign) return

    form.setFieldsValue({
      campaignName: campaign.campaignName,
      startDate: dayjs(campaign.startDate),
      endDate: dayjs(campaign.endDate),
      universityId: campaign.universityId,
    })
  }, [campaign, form])

  // Input class name
  const className =
    "h-[40px] focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  // Form submit handler
  const onFinish = async (values: CampaignFormType) => {
    const data = {
      ...values,
      startDate: values.startDate?.format("YYYY-MM-DD"),
      endDate: values.endDate?.format("YYYY-MM-DD"),
      id: campaignId,
    }

    try {
      if (campaignId) {
        await campaignService.updateCampaign(data)
        toast.success("Campaign updated successfully")
      } else {
        await campaignService.createCampaign(data)
        toast.success("Campaign created successfully")
      }
      router.push(config.routes.campaignList)
    } catch (error) {
      toast.error("Failed to create campaign")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "Campaign Name",
      name: "campaignName",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Start Date",
      name: "startDate",
      Input: <DatePicker format="YYYY-MM-DD" className={className} />,
    },
    {
      label: "End Date",
      name: "endDate",
      Input: <DatePicker format="YYYY-MM-DD" className={className} />,
    },
    {
      label: "University",
      name: "universityId",
      Input: (
        <Select
          options={universities?.map((uni: University) => ({ value: uni.universityId, label: uni.universityName }))}
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
          {campaignId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default CampaignForm
