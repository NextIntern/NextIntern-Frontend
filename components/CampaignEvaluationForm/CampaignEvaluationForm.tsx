"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, DatePicker, Form, Row, Select } from "antd"
import dayjs from "dayjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { CampaignEvlFormType } from "./CampaignEvaluationForm.type"
import config from "@/config"
import { campaignEvaluationService, campaignService } from "@/services"
import { Campaign } from "@/types"
import * as constants from "@/utils/constants"

const CampaignForm = () => {
  // Get universities
  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => campaignService.getCampaigns(),
    select: (data) => data.data.data,
  })

  // Get campaign id from query params
  const searchParams = useSearchParams()
  const campaignEvlId = searchParams.get("campaignEvaluationId") ?? ""

  // Get campaign by id
  const { data: campaignEvl } = useQuery({
    queryKey: ["campaignEvl"],
    queryFn: () => campaignEvaluationService.getCampaignEvaluationById(campaignEvlId),
    select: (data) => data.data.data,
    enabled: !!campaignEvlId,
  })

  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Populate form with campaign data
  useEffect(() => {
    if (!campaignEvl || !campaignEvlId) return

    form.setFieldsValue({
      startDate: dayjs(campaignEvl.startDate ?? Date.now()),
      endDate: dayjs(campaignEvl.endDate ?? Date.now()),
      universityId: campaignEvl.campaignEvaluationId,
    })
  }, [campaignEvl, campaignEvlId, form])

  // Input class name
  const className =
    "h-[40px] focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  // Form submit handler
  const onFinish = async (values: CampaignEvlFormType) => {
    const data = {
      ...values,
      startDate: values.startDate?.format(constants.DATE_FORMAT),
      endDate: values.endDate?.format(constants.DATE_FORMAT),
      id: campaignEvlId,
    }

    try {
      if (campaignEvlId) {
        await campaignEvaluationService.updateCampaignEvaluation(data)
        toast.success("Campaign updated successfully")
      } else {
        await campaignEvaluationService.createCampaignEvaluation(data)
        toast.success("Campaign created successfully")
      }
      router.push(config.routes.campaignEvlList)
    } catch (error) {
      toast.error("Failed to create campaign evaluation")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "Start Date",
      name: "startDate",
      Input: <DatePicker format={constants.DATE_FORMAT} className={className} />,
    },
    {
      label: "End Date",
      name: "endDate",
      Input: <DatePicker format={constants.DATE_FORMAT} className={className} />,
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
          {campaignEvlId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default CampaignForm
