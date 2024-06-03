"use client"

import "styles/tailwind.css"
import { GithubOutlined, GoogleOutlined, TwitterOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function RootLayout() {
  const [_, setLoading] = useState(false)

  const onFinish = (values: any) => {
    console.log("Success:", values)
    setLoading(true)
    // Simulate login process
    setTimeout(() => {
      setLoading(false)
      alert("Logged in successfully!")
    }, 2000)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="m-auto flex h-screen w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <Image
          src="/company-logo.png" // Path to your company logo
          alt=""
          width={400} // Adjust the width as needed
          height={400} // Adjust the height as needed
          className="object-contain"
        />
      </div>
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg md:mx-0 md:ml-4 md:mr-8">
        <h2 className="mt-2 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-center text-2xl font-extrabold text-transparent">
          NEXTINTERN
        </h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Link href="#" className="float-right text-sm">
              Forgot Password?
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="background-transparent text-bold w-full bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
            >
              Login
            </Button>
          </Form.Item>
          <div className="my-2 text-center">or continue with</div>
          <div className="flex justify-center space-x-4">
            <Button icon={<GoogleOutlined />} shape="circle" />
            <Button icon={<GithubOutlined />} shape="circle" />
            <Button icon={<TwitterOutlined />} shape="circle" />
          </div>
        </Form>
      </div>
    </div>
  )
}
