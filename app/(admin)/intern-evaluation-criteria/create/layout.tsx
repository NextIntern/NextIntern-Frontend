import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Intern Evaluation | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
