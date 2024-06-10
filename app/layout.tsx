import "styles/tailwind.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import { Metadata } from "next"
import { Toaster } from "react-hot-toast"

import theme from "@/styles/antd.styles"

export const metadata: Metadata = {
  title: {
    template: "%s | NextIntern",
    default: "NextIntern",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
          <Toaster toastOptions={{ duration: 3000 }} />
        </AntdRegistry>
      </body>
    </html>
  )
}
