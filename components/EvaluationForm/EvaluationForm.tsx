"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, Form, Row, Select, Switch } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { EvaluationFormType } from "./EvaluationForm.type"
import config from "@/config"
import { evaluationFormService, universityService } from "@/services"
import { University } from "@/types"

const EvaluationFormComponent = () => {
  // Get all universities
  const { data: universities } = useQuery({
    queryKey: ["university"],
    queryFn: () => universityService.getUniversities(),
    select: (data) => data.data.data,
  })

  // Get campaign id from query params
  const searchParams = useSearchParams()
  const evaluationFormId = searchParams.get("evaluationFormId") ?? ""

  // Get form criteria by id
  const { data: evaluationForm } = useQuery({
    queryKey: ["evaluationForm"],
    queryFn: () => evaluationFormService.getEvaluationFormById(evaluationFormId),
    select: (data) => data.data.data,
  })

  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Populate form with campaign data
  useEffect(() => {
    if (!evaluationForm || !evaluationFormId) return

    form.setFieldsValue(evaluationForm)
  }, [evaluationForm, evaluationFormId, form])

  // Form submit handler
  const onFinish = async (values: EvaluationFormType) => {
    const data = {
      ...values,
      id: evaluationFormId,
    }

    try {
      if (evaluationFormId) {
        await evaluationFormService.updateEvaluationForm(data)
        toast.success("Evaluation form updated successfully")
      } else {
        await evaluationFormService.createEvaluationForm(data)
        toast.success("Evaluation form created successfully")
      }
      router.push(config.routes.evaluationFormList)
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "University",
      name: "universityId",
      Input: (
        <Select
          options={universities?.map((uni: University) => ({ value: uni.universityId, label: uni.universityName }))}
        />
      ),
    },
    {
      label: "Status",
      name: "isActive",
      Input: <Switch checkedChildren="Active" unCheckedChildren="Inactive" />,
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
          {evaluationFormId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default EvaluationFormComponent
