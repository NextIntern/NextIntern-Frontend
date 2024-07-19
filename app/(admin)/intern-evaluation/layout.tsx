import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Intern Evaluation Page | NextIntern",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
