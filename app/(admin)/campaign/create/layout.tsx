import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Campaign | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
