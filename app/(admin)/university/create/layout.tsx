import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create University Page",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
