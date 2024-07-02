"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, Form, Input, Row, Select } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { InternEvlFormType } from "./InternEvaluationForm.type"
import config from "@/config"
import { campaignEvaluationService, internEvaluationService, internService } from "@/services"
import { CampaignEvaluation, Intern } from "@/types"

const InternEvaluationForm = () => {
  // Get intern evaluations
  const { data: campaignEvls } = useQuery({
    queryKey: ["campaignEvls"],
    queryFn: () => campaignEvaluationService.getCampaignEvaluations(),
    select: (data) => data.data.data,
  })

  // Get all internships
  const { data: interns } = useQuery({
    queryKey: ["interns"],
    queryFn: () => internService.getInterns(),
    select: (data) => data.data.data,
  })

  // Get intern evaluation id from query params
  const searchParams = useSearchParams()
  const internEvlId = searchParams.get("internEvaluationId") ?? ""

  // Get intern evaluation by id
  const { data: internEvl } = useQuery({
    queryKey: ["internEvl"],
    queryFn: () => internEvaluationService.getInternEvlById(internEvlId),
    select: (data) => data.data.data,
    enabled: !!internEvlId,
  })

  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Populate form with intern evaluation data
  useEffect(() => {
    if (!internEvl || !internEvlId) return

    form.setFieldsValue(internEvl)
  }, [form, internEvl, internEvlId])

  // Input class name
  const className =
    "h-[40px] focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  // Form submit handler
  const onFinish = async (values: InternEvlFormType) => {
    const data = {
      ...values,
      id: internEvlId,
    }

    try {
      if (internEvlId) {
        await internEvaluationService.updateInternEvl(data)
        toast.success("Intern evaluation updated successfully")
      } else {
        await internEvaluationService.createInternEvl(data)
        toast.success("Intern evaluation created successfully")
      }
      router.push(config.routes.internEvlList)
    } catch (error) {
      toast.error("Failed to create intern evaluation")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "Internship",
      name: "internId",
      Input: (
        <Select
          options={interns?.map((intern: Intern) => ({
            value: intern.userId,
            label: intern.fullname,
          }))}
        />
      ),
    },
    {
      label: "Campaign Evaluation",
      name: "campaignEvaluationId",
      Input: (
        <Select
          options={campaignEvls?.map((campaignEvl: CampaignEvaluation) => ({
            value: campaignEvl.campaignEvaluationId,
            label: campaignEvl.campaignName,
          }))}
        />
      ),
    },
    {
      label: "Feedback",
      name: "feedback",
      Input: <Input className={className} />,
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
          {internEvlId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default InternEvaluationForm
