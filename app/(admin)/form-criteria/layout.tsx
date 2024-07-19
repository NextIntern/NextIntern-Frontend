import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Form Criteria Page | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
