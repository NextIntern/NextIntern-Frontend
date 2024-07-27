import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Campaign Question Form Page | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
