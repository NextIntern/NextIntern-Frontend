"use client"

import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { CampaignFormType } from "./CampaignForm.type"
import config from "@/config"
import { campaignService } from "@/services"

const CampaignForm = () => {
  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // University dummy data
  const UNIVERSITIES = [
    { value: "ab24f88a-e454-4adc-9048-02b256e8118c", label: "FPT University" },
    { value: "bb568405-6e7a-48bf-ba71-800a1f4947ca", label: "HUTECH University" },
  ]

  // Input class name
  const className =
    "bg-red border-red-500 focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  const onFinish = async (values: CampaignFormType) => {
    const data = {
      ...values,
      startDate: values.startDate?.format("YYYY-MM-DD"),
      endDate: values.endDate?.format("YYYY-MM-DD"),
    }

    try {
      await campaignService.createCampaign(data)
      toast.success("Campaign created successfully")
      const TOAST_TIMEOUT = 3000
      setTimeout(() => router.push(config.routes.campaignList), TOAST_TIMEOUT)
    } catch (error) {
      toast.error("Failed to create campaign")
    }
  }

  // TODO: Get universities
  useEffect(() => {
    async function getUniversities() {
      // const { data } = await campaignService.getCampaigns()
      // setUniversities(data)
    }
    getUniversities()
  }, [])

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
      Input: <DatePicker format="YYYY-MM-DD" />,
    },
    {
      label: "End Date",
      name: "endDate",
      Input: <DatePicker format="YYYY-MM-DD" />,
    },
    {
      label: "University",
      name: "universityId",
      Input: <Select options={UNIVERSITIES} />,
    },
  ]

  return (
    <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} layout="horizontal" size="large">
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
          Create
        </button>
      </div>
    </Form>
  )
}
export default CampaignForm
