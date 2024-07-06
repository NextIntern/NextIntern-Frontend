"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, Form, Input, Row, Select } from "antd"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { FormCriteriaType } from "./FormCriteria.type"
import config from "@/config"
import { useParam } from "@/hooks"
import { evaluationFormService } from "@/services"
import formCriteriaService from "@/services/form-criteria.service"
import { EvaluationForm } from "@/types"

const FormCriteriaForm = () => {
  // Get all evaluation forms
  const { data: evaluationForms } = useQuery({
    queryKey: ["university"],
    queryFn: () => evaluationFormService.getEvaluationForms(),
    select: (data) => data.data.data,
  })

  // Get campaign id from query params
  const formCriteriaId = useParam("formCriteriaId")

  // Get form criteria by id
  const { data: formCriteria } = useQuery({
    queryKey: ["formCriteria"],
    queryFn: () => formCriteriaService.getFormCriteriaById(formCriteriaId),
    select: (data) => data.data.data,
    enabled: !!formCriteriaId,
  })

  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Populate form with campaign data
  useEffect(() => {
    if (!formCriteria || !formCriteriaId) return

    form.setFieldsValue(formCriteria)
  }, [form, formCriteria, formCriteriaId])

  // Input class name
  const className =
    "h-[40px] focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  // Form submit handler
  const onFinish = async (values: FormCriteriaType) => {
    const data = {
      ...values,
      id: formCriteriaId,
      formCriteriaName: values.name,
    }

    try {
      if (formCriteriaId) {
        await formCriteriaService.updateFormCriteria(data)
        toast.success("Form criteria updated successfully")
      } else {
        await formCriteriaService.createFormCriteria(data)
        toast.success("Form criteria created successfully")
      }
      router.push(config.routes.formCriteriaList)
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "Form Criteria Name",
      name: "name",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Guide",
      name: "guide",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Min Score",
      name: "minScore",
      Input: <Input type="number" className={className} />,
    },
    {
      label: "Max Score",
      name: "maxScore",
      Input: <Input type="number" className={className} />,
    },
    {
      label: "Evaluation Form",
      name: "evaluationFormId",
      Input: (e
        <Select
          options={evaluationForms?.map((evlForm: EvaluationForm) => ({
            value: evlForm.evaluationFormId,
            label: evlForm.university.universityName,
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
          {formCriteriaId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default FormCriteriaForm
