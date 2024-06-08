import "styles/tailwind.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Metadata } from "next"

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
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
