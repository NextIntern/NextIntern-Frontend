"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC } from "react"

// TODO: Split this function to utils
const isSubPath = (pathname: string) => pathname.split("/").length > 2

interface NavLinkProps {
  href: string
  children: React.ReactNode
  Icon: React.ReactElement
}

const NavLink: FC<NavLinkProps> = ({ href, children, Icon }) => {
  // Check is active link
  const pathname = usePathname()
  const isActive = isSubPath(pathname) ? pathname.startsWith(href + "/") : pathname === href

  // Active classname
  const activeClassName = isActive
    ? "bg-green-500 font-bold text-white hover:bg-green-600 before:absolute before:left-0 before:w-[5px] before:h-8 before:bg-green-500 before:rounded-r-lg"
    : ""

  return (
    <Link
      href={href}
      className={`mx-4 my-2 flex items-center rounded-xl p-4 text-sm font-medium transition-colors duration-300 hover:bg-gray-200 ${activeClassName}`}
    >
      {Icon}
      <span className="ml-2">{children}</span>
    </Link>
  )
}

export default NavLink
