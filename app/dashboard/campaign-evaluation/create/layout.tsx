import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Campaign Evaluation | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
