"use client"

import { Col, Form, Input, Row } from "antd"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { UniversityFormType } from "./UniversityForm.type"
import config from "@/config"
import { universityService } from "@/services"

const UniversityForm = () => {
  // Router instance
  const router = useRouter()

  // Form instance
  const [form] = Form.useForm()

  // Input class name
  const className =
    "bg-red border-red-500 focus:ring-opacity-40/40 mt-2 block w-full cursor-pointer rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"

  const onFinish = async (values: UniversityFormType) => {
    try {
      await universityService.createUniversity(values)
      toast.success("University created successfully")
      router.push(config.routes.universityList)
    } catch (error) {
      toast.error("Failed to create university")
    }
  }

  // Form elements
  const FORM_ELEMENTS = [
    {
      label: "University Name",
      name: "universityName",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Address",
      name: "address",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Phone Number",
      name: "phone",
      Input: <Input type="text" className={className} />,
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
export default UniversityForm
