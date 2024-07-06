"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { InternshipFormType } from "./InternshipForm.type"
import config from "@/config"
import { useParam } from "@/hooks"
import { evaluationFormService, internService, roleService } from "@/services"
import { DATE_FORMAT, GENDERS } from "@/utils/constants"

const InternshipForm = () => {
  // Get all role
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => roleService.getAllRole(),
    select: (data) => data.data.data,
  })

  // Get all role
  const { data: evaluationForms } = useQuery({
    queryKey: ["evllForm"],
    queryFn: () => evaluationFormService.getEvaluationForms(),
    select: (data) => data.data.data,
  })

  // Get intern id from query params
  const internId = useParam("internId")

  // Get form criteria by id
  const { data: intern } = useQuery({
    queryKey: ["intern"],
    queryFn: () => internService.getInternById(internId),
    select: (data) => data.data.data,
  })

  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Populate form with campaign data
  useEffect(() => {
    if (!intern || !internId) return

    form.setFieldsValue(intern)
  }, [form, intern, internId])

  // Input class name
  const className =
    "h-[40px] bg-red border-red-500 focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  // Form submit handler
  const onFinish = async (values: InternshipFormType) => {
    const data = {
      ...values,
      dob: values.dob?.format(DATE_FORMAT),
      id: internId,
    }

    try {
      if (internId) {
        await internService.updateIntern(data)
        toast.success("Intern updated successfully")
      } else {
        await internService.createIntern(data)
        toast.success("Intern created successfully")
      }
      router.push(config.routes.evaluationFormList)
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "Username",
      name: "username",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Password",
      name: "password",
      Input: <Input type="password" className={className} />,
    },
    {
      label: "Fullname",
      name: "fullname",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Email",
      name: "email",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Gender",
      name: "gender",
      Input: <Select options={GENDERS.map((gender) => ({ value: gender, label: gender }))} />,
    },
    {
      label: "Telephone",
      name: "telephone",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Date of Birth",
      name: "startDate",
      Input: <DatePicker format="YYYY-MM-DD" />,
    },
    {
      label: "Role",
      name: "roleName",
      Input: <Select options={roles?.map((role) => ({ value: role.roleId, label: role.roleName }))} />,
    },
    {
      label: "Evaluation Form",
      name: "evaluationFormId",
      Input: (
        <Select
          options={evaluationForms?.map((evlForm) => ({
            value: evlForm.evaluationFormId,
            label: evlForm.university.universityNam,
          }))}
        />
      ),
    },
    {
      label: "Address",
      name: "address",
      Input: <Input type="text" className={className} />,
    },
  ]

  const handleDownload = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    toast.success("TODO: Download template")
  }

  const handleImport = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    toast.success("TODO: Import file")
  }

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
        <button
          onClick={handleDownload}
          className="mr-2 rounded-md border border-primary bg-gradient-to-r from-secondary to-primary bg-clip-text px-8 py-2.5 font-semibold leading-5 text-transparent transition-colors duration-300 focus:outline-none"
        >
          Download Template
        </button>
        <button
          onClick={handleImport}
          className="mr-2 rounded-md border border-secondary bg-gradient-to-r from-secondary to-primary bg-clip-text px-8 py-2.5 font-semibold leading-5 text-transparent transition-colors duration-300 focus:outline-none"
        >
          Import File
        </button>
        <button className="rounded-md bg-gradient-to-r from-primary to-secondary px-8 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none">
          {internId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default InternshipForm
