"use client";

import "styles/tailwind.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import Image from 'next/image';
import { GoogleOutlined, GithubOutlined, TwitterOutlined } from '@ant-design/icons';


    export default function RootLayout({ children }: { children: React.ReactNode }) {
      const [loading, setLoading] = useState(false);

      const onFinish = (values: any) => {
      console.log('Success:', values);
       setLoading(true);
    // Simulate login process
       setTimeout(() => {
       setLoading(false);
       alert('Logged in successfully!');
       }, 2000);
       };

      const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
       };
     return (
        <html lang="en">
        <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex h-screen m-auto w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Image
          src="/company-logo.png" // Path to your company logo
          alt=""
          width={400} // Adjust the width as needed
          height={400} // Adjust the height as needed
          className="object-contain"
        />
        </div>
        <AntdRegistry>
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 mx-auto md:mx-0 md:ml-4 md:mr-8">
        <h2 className="mt-2 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-2xl text-center font-extrabold text-transparent">NEXTINTERN</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <a href="#" className="float-right text-sm">Forgot Password?</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-gradient-to-r from-blue-500 to-green-500 background-transparent shadow-lg text-white text-bold">
              Login
            </Button>
          </Form.Item>
          <div className="text-center my-2">or continue with</div>
          <div className="flex justify-center space-x-4">
            <Button icon={<GoogleOutlined />} shape="circle" />
            <Button icon={<GithubOutlined />} shape="circle" />
            <Button icon={<TwitterOutlined />} shape="circle" />
          </div>
        </Form>
      </div>

              </AntdRegistry>
            </body>
          </html>
        )
}
