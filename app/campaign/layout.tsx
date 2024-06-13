import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Campaign Page",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
