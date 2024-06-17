import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Internship Page | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
