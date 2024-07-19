"use client"

import "./styles.css"
import { useQuery } from "@tanstack/react-query"
import { Col, DatePicker, Form, Image, Input, Row, Select } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import * as XLSX from "xlsx"

import config from "@/config"
import { useParam } from "@/hooks"
import { evaluationFormService, fileService, internService } from "@/services"
import { DATE_FORMAT, GENDERS } from "@/utils/constants"
import { InternshipFormType } from "./InternshipForm.type"

const InternshipForm = () => {
  const [imgUrl, setImgUrl] = useState("")

  // Get all role
  const { data: evaluationForms } = useQuery({
    queryKey: ["evlForm"],
    queryFn: () => evaluationFormService.getEvaluationForms(),
    select: (data) => data.data.data.items,
  })

  // Get intern id from query params
  const internId = useParam("internId")

  // Get form criteria by id
  const { data: intern } = useQuery({
    queryKey: ["intern"],
    queryFn: () => internService.getInternById(internId),
    select: (data) => data.data.data,
    enabled: !!internId,
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
      roleName: "User",
      imgUrl,
      campaignId: "33a1a8b8-dafa-4f46-bbba-a9628f36bd97", // TODO: Add campaign id
      menterUsername: "mentor", // TODO: Add mentor username
    }

    try {
      if (internId) {
        await internService.updateIntern(data)
        toast.success("Intern updated successfully")
      } else {
        await internService.createIntern(data)
        toast.success("Intern created successfully")
      }
      router.push(config.routes.internshipList)
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return

    fileService.uploadFile(e.target.files?.[0], "interns", (imageUrl: string) => {
      if (!imageUrl) {
        toast.error("Error in upload image")
        return
      }
      setImgUrl(imageUrl)
    })
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
      label: "Confirm Password",
      name: "confirmedPassword",
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
      name: "dob",
      Input: <DatePicker format="YYYY-MM-DD" />,
    },
    {
      label: "Evaluation Form",
      name: "evaluationFormId",
      Input: (
        <Select
          options={evaluationForms?.map((evlForm) => ({
            value: evlForm.evaluationFormId,
            label: evlForm.university.universityName,
          }))}
        />
      ),
    },
    {
      label: "Address",
      name: "address",
      Input: <Input type="text" className={className} />,
    },
    {
      label: "Avatar",
      name: "imgUrl",
      Input: <Input type="file" onChange={handleUploadFile} />,
    },
  ]

  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    fileService.downloadTemplate()
    toast.success("Download template successfully")
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const formData = new FormData()
    const file = event.target.files?.[0]
    if (file) {
      formData.append("File", file)

      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ]
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid Excel file")
        return
      }
    }
    // formData.append("CampaignId", "2f1ec965-2c99-4697-bd6b-cd0725156805")  TODO: Add campaign id
    // fileService.importIntern(formData)

    toast.success("Import successfully")
    router.push(config.routes.internshipList)
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
      {(imgUrl || intern?.imgUrl) && (
        <Image src={imgUrl || intern?.imgUrl || "/logo.png"} alt="Internship Image" width={200} height={200} />
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleDownload}
          className="mr-2 cursor-pointer rounded-md border border-primary px-8 py-2.5 font-semibold leading-5 text-primary transition-colors duration-300 focus:outline-none"
        >
          Download Template
        </button>
        <input type="file" id="file" onChange={handleImport} className="hidden" />
        <label
          htmlFor="file"
          className="mr-2 cursor-pointer rounded-md border border-secondary px-8 py-2.5 font-semibold leading-5 text-secondary transition-colors duration-300 focus:outline-none"
        >
          Import file
        </label>
        <button className="rounded-md bg-gradient-to-r from-primary to-secondary px-8 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none">
          {internId ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  )
}
export default InternshipForm
