import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Update University | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
