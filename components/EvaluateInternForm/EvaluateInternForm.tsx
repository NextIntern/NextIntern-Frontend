"use client"

import { useQuery } from "@tanstack/react-query"
import { Button, Form, Input, Select } from "antd"
import { useEffect } from "react"

import toast from "react-hot-toast"
import { useParam } from "@/hooks"
import { campaignEvaluationService, evaluateInternService, formCriteriaService } from "@/services"
import { CampaignEvaluation, FormCriteria } from "@/types"

const EvaluateInternForm = ({ internId }: { internId: string }) => {
  // Get intern evaluations
  const { data: campaignEvls } = useQuery({
    queryKey: ["campaignEvls"],
    queryFn: () => campaignEvaluationService.getCampaignEvaluations(),
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

  // Form instance
  const [form] = Form.useForm()

  // Populate form with intern evaluation data
  useEffect(() => {
    if (!internScore || !internEvlCriteriaId) return

    form.setFieldsValue({
      ...internScore,
      fromCriteriaId: internScore.formCriteriaDto.formCriteriaId,
      internEvaluationId: internScore.internEvaluationDto.internEvaluationId,
    })
  }, [form, internEvlCriteriaId, internScore])

  // Input class name
  const className =
    "h-[40px] focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  // Form submit handler
  const onFinish = async (values: any) => {
    const data = {
      ...values,
      internId,
    }

    try {
      await evaluateInternService.evaluateIntern(data)
      toast.success("Intern evaluation updated successfully")
    } catch (error) {
      toast.error("An error occured")
    }
  }

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Form.Item name="campaignEvaluationId" label="Campaign Evaluation">
        <Select
          options={campaignEvls?.map((campaignEvl: CampaignEvaluation) => ({
            value: campaignEvl.campaignEvaluationId,
            label: campaignEvl.campaignName,
          }))}
        />
      </Form.Item>

      <Form.List name="internEvaluationCriterias">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <div key={field.key} style={{ display: "flex", alignItems: "center" }}>
                <Form.Item
                  label={`Form Criteria ${field.name + 1}`}
                  name={[field.name, "criteria"]}
                  style={{ flex: 1 }}
                >
                  <Select
                    options={formCriterias?.map((formCriteria: FormCriteria) => ({
                      value: formCriteria.formCriteriaId,
                      label: formCriteria.name,
                    }))}
                  />
                </Form.Item>
                <Form.Item name={[field.name, "score"]}>
                  <Input className={className} />
                </Form.Item>
                <Button onClick={() => remove(field.name)}>Remove</Button>
              </div>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
      <div className="mt-8 flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-8 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          {internEvlCriteriaId ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  )
}

export default EvaluateInternForm
