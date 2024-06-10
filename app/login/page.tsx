"use client"

import "styles/tailwind.css"
import { GithubOutlined, GoogleOutlined, TwitterOutlined } from "@ant-design/icons"
import { Button, ConfigProvider, Divider, Form, Input } from "antd"
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-300 to-green-300">
      <div className="mx-56 flex w-full items-center rounded-3xl bg-white p-8 shadow-lg">
        <div className=" flex w-1/2 flex-col items-center justify-center  ">
          <Image
            src="/logo.png" // Path to your company logo
            alt=""
            width={300} // Adjust the width as needed
            height={400} // Adjust the height as needed
            className="object-contain"
          />
          <h2 className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-center text-2xl font-extrabold text-transparent">
            NEXTINTERN
          </h2>
        </div>

        <div className=" w-1/2 md:mx-0 md:ml-4 md:mr-8 ">
          <div className="flex flex-col items-center justify-center gap-y-1 pb-8">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-xs italic text-gray-500">Please login to your account</p>
          </div>

          <ConfigProvider
            theme={{
              token: { controlHeight: 50, borderRadius: 12 },
            }}
          >
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="space-y-4"
            >
              <div>
                <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Input: {
                          activeBorderColor: "#21b179",
                          hoverBorderColor: "#2092f3",
                        },
                      },
                    }}
                  >
                    <Input placeholder="Username" className="bg-[#f5f7f9]" />
                  </ConfigProvider>
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Input: {
                          activeBorderColor: "#21b179",
                          hoverBorderColor: "#2092f3",
                        },
                      },
                    }}
                  >
                    <Input.Password placeholder="Password" />
                  </ConfigProvider>
                </Form.Item>

                <Form.Item>
                  <Link href="#" className="float-right text-sm text-[gray]">
                    Forgot Password?
                  </Link>
                </Form.Item>
              </div>

              <Form.Item>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultBg: "linear-gradient(to right, #2092f3, #21b179)",
                        defaultHoverBg: "linear-gradient(to left, #2092f3, #21b179)",
                        defaultColor: "white",
                        defaultHoverColor: "#000",
                        fontWeight: 600,
                        contentFontSize: 16,
                        contentFontSizeLG: 60,
                      },
                    },
                  }}
                >
                  <Button
                    htmlType="submit"
                    className="background-transparent text-bold w-full bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
                  >
                    Login
                  </Button>
                </ConfigProvider>
              </Form.Item>

              <div>
                <ConfigProvider
                  theme={{
                    token: {
                      colorText: "#9a9fa9",
                    },
                  }}
                >
                  <Divider>Or login with</Divider>
                </ConfigProvider>
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Button icon={<GoogleOutlined />} shape="circle" />
                <Button icon={<GithubOutlined />} shape="circle" />
                <Button icon={<TwitterOutlined />} shape="circle" />
              </div>

              <div className="flex items-center justify-center gap-x-[3px] text-[#9a9fa9]">
                <p>Do not have an account?</p>
                <Link href="#" className="font-semibold text-green-500 underline">
                  Singup
                </Link>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}
