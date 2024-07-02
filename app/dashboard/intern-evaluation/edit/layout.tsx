import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Update Intern Evaluation | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}