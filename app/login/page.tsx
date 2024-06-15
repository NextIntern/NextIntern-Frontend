"use client"

import "styles/tailwind.css"
import { GithubOutlined, GoogleOutlined, TwitterOutlined } from "@ant-design/icons"
import { Button, ConfigProvider, Divider, Form, Input } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import config from "@/config"
import { loginService } from "@/services"

type LoginFormType = {
  username: string
  password: string
}

const BUTTON_GROUP = [
  {
    icon: <GoogleOutlined />,
  },
  {
    icon: <GithubOutlined />,
  },
  {
    icon: <TwitterOutlined />,
  },
]

export default function RootLayout() {
  const router = useRouter()
  const onFinish = async (values: LoginFormType) => {
    try {
      await loginService.postLogin(values.username, values.password)
      toast.success("Logged in successfully!")
      router.push(config.routes.dashboard)
    } catch (error) {
      toast.error("Login failed!")
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-300 to-green-300">
      <div className="mx-56 flex w-full items-center rounded-3xl bg-white p-8 shadow-lg">
        <div className=" flex w-1/2 flex-col items-center justify-center  ">
          <Image src="/logo.png" alt="" width={300} height={400} className="object-contain" />
          <h2 className="mt-8 bg-gradient-to-r from-secondary to-primary bg-clip-text text-center text-2xl font-extrabold text-transparent">
            NEXTINTERN
          </h2>
        </div>

        <div className=" w-1/2 md:mx-0 md:ml-4 md:mr-8 ">
          <div className="flex flex-col items-center justify-center gap-y-1 pb-8">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-xs italic text-gray-500">Please login to your account</p>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="space-y-4"
          >
            <div>
              <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input placeholder="Username" className="bg-[#f5f7f9]" />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Link href="#" className="float-right text-sm text-[gray]">
                  Forgot Password?
                </Link>
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                htmlType="submit"
                className="background-transparent text-bold w-full bg-gradient-to-r from-secondary to-primary text-white shadow-lg"
              >
                Login
              </Button>
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
              {BUTTON_GROUP.map((item, index) => (
                <Button key={index} icon={item.icon} shape="circle" />
              ))}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
