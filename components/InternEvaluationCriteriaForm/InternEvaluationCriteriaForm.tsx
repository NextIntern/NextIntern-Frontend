"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, Form, Input, Row, Select } from "antd"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { InternEvlCriteriaFormType } from "./InternEvaluationCriteriaForm.type"
import config from "@/config"
import { useParam } from "@/hooks"
import { evaluateInternService, formCriteriaService, internEvaluationService } from "@/services"
import { FormCriteria, InternEvaluation } from "@/types"

const InternEvaluationCriteriaForm = () => {
  // Get intern evaluations
  const { data: internEvls } = useQuery({
    queryKey: ["internEvls"],
    queryFn: () => internEvaluationService.getInternEvls(),
    select: (data) => data.data.data.items,
  })

  // Get all internships
  const { data: formCriterias } = useQuery({
    queryKey: ["formCriterias"],
    queryFn: () => formCriteriaService.getFormCriterias(),
    select: (data) => data.data.data.items,
  })

  // Get intern evaluation id from query params
  const internEvlCriteriaId = useParam("internEvlCriteriaId")

  // Get intern evaluation by id
  const { data: internScore } = useQuery({
    queryKey: ["internScore"],
    queryFn: () => evaluateInternService.getById(internEvlCriteriaId),
    select: (data) => data.data.data,
    enabled: !!internEvlCriteriaId,
  })

  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Populate form with intern evaluation data
  useEffect(() => {
    if (!internScore || !internEvlCriteriaId) return

    form.setFieldsValue({
      ...internScore,
      formCriteriaId: internScore.formCriteriaDto.formCriteriaId,
      internEvaluationId: internScore.internEvaluationDto.internEvaluationId,
    })
  }, [form, internEvlCriteriaId, internScore])

  // Input class name
  const className =
    "h-[40px] focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  // Form submit handler
  const onFinish = async (values: InternEvlCriteriaFormType) => {
    const data = {
      ...values,
      internEvaluationCriteriaId: internEvlCriteriaId,
    }

    try {
      if (internEvlCriteriaId) {
        await evaluateInternService.update(data)
        toast.success("Intern evaluation updated successfully")
      } else {
        await evaluateInternService.create(data)
        toast.success("Intern evaluation created successfully")
      }
      router.push(config.routes.internEvlCriteriaList)
    } catch (error) {
      toast.error("An error occured")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "Intern Evaluation",
      name: "internEvaluationId",
      Input: (
        <Select
          options={internEvls?.map((internEvl: InternEvaluation) => ({
            value: internEvl.internEvaluationId,
            label: internEvl.internName,
          }))}
        />
      ),
    },
    {
      label: "Form Criteria",
      name: "formCriteriaId",
      Input: (
        <Select
          options={formCriterias?.map((formCriteria: FormCriteria) => ({
            value: formCriteria.formCriteriaId,
            label: formCriteria.name,
          }))}
        />
      ),
    },
    {
      label: "Score",
      name: "score",
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
          {internEvlCriteriaId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default InternEvaluationCriteriaForm
