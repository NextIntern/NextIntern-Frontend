"use client"

import "./styles.css"

import { useQuery } from "@tanstack/react-query"
import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { InternshipFormType } from "./InternshipForm.type"
import config from "@/config"
import { internService, roleService } from "@/services"
import { DATE_FORMAT } from "@/utils/constants"

const InternshipForm = () => {
  // Get all role
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => roleService.getAllRole(),
    select: (data) => data.data.data,
  })

  const GENDERS = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ]

  // Get intern id from query params
  const searchParams = useSearchParams()
  const internId = searchParams.get("internId") ?? ""

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
      Input: <Select options={GENDERS} />,
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
      label: "Address",
      name: "address",
      Input: <Input type="text" className={className} />,
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
          {internId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default InternshipForm
