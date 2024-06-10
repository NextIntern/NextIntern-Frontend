import { Metadata } from "next"
import Link from "next/link"
import { CiCalendar, CiEdit, CiHome, CiLogout, CiSettings, CiStickyNote, CiViewList } from "react-icons/ci"

import NavLink from "@/components/NavLink"
import config from "@/config"

export const metadata: Metadata = {
  title: "Dashboard",
}

const NAV_LINKS = [
  { href: config.routes.dashboard, icon: CiHome, children: "Dashboard" },
  { href: config.routes.campaignList, icon: CiEdit, children: "Training Campaign" },
  { href: config.routes.home, icon: CiViewList, children: "Intern Management" },
  { href: config.routes.home, icon: CiStickyNote, children: "Learning Material" },
  { href: config.routes.home, icon: CiCalendar, children: "Training Calendar" },
  { href: config.routes.home, icon: CiSettings, children: "Settings" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Sidebar */}
      <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white text-gray-600 md:w-64">
        {/* Logo */}
        <div className="hidden h-16 items-center justify-center text-white md:flex">
          <h1 className="mt-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-2xl font-extrabold text-transparent">
            NextIntern
          </h1>
        </div>
        <div className="my-2 flex flex-1 flex-col justify-between rounded-lg transition-colors duration-300 md:my-4">
          {/* Navigation Links */}
          <div className="hidden md:block">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <NavLink key={link.children} href={link.href} Icon={<Icon size="20" />}>
                  {link.children}
                </NavLink>
              )
            })}
          </div>
          {/* Sign out */}
          <Link
            href="/"
            className="mx-4 my-2 flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-white p-4 font-medium transition-colors duration-300 hover:bg-gray-100 md:w-auto md:flex-none md:justify-start"
          >
            <CiLogout className="text-xl" />
            <span className="hidden md:block">Sign Out</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="m-4 flex-1 rounded-[50px] bg-slate-50 p-8">{children}</div>
    </div>
  )
}
