import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Evaluation Form | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
