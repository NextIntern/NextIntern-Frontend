import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FaAngleRight } from "react-icons/fa"
import config from "@/config"

export const metadata: Metadata = {
  title: "NextIntern",
  description: "NextIntern - Internship Managemenet System for NextBean Text",
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://nextintern.tech/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://nextintern.tech/open-graph.png",
      },
    ],
  },
}

export default function Web() {
  const NAV_BAR = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Contact",
      href: "#contact",
    },
    {
      name: "Blog",
      href: "#blog",
    },
  ]

  return (
    <>
      <header className="navbar text-navy container relative z-[500] mx-auto flex h-24 items-center justify-between px-4 text-sm font-medium sm:px-6 lg:px-8">
        <Link className="relative z-[60] flex items-center gap-4" href={config.routes.home}>
          <Image src="/logo.svg" alt="Logo" width="36" height="36" />
          <h2 className="text-xl font-bold">NextIntern</h2>
        </Link>

        <nav className="pointer-events-auto hidden items-center justify-end lg:flex xl:w-full">
          <div className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center rounded-full border border-white/50 bg-white/75 bg-gradient-to-r px-3 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-xl">
            {NAV_BAR.map((item) => (
              <Link
                key={item.name}
                className="hover:primary group relative block flex-none px-4 py-2.5 transition duration-300"
                href={item.href}
              >
                {item.name}
                <span className="absolute inset-x-1 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-primary/50 to-primary/60 opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100"></span>
                <span className="absolute inset-0 origin-bottom scale-0 overflow-hidden opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <span className="absolute inset-x-4 -bottom-2 h-full rounded-t-full bg-gradient-to-t from-primary/20 to-transparent blur"></span>
                </span>
              </Link>
            ))}
          </div>
        </nav>

        <Link
          href={config.routes.login}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Login
        </Link>
      </header>

      <main className="flex flex-col items-center">
        <div className="mx-auto flex flex-col items-center py-16 text-center">
          <div className="bg-[200%_200%]animate-glow pointer-events-none absolute top-[-320px] z-10 flex h-[400px] w-[min(600px,100vw)] scale-[1.5] items-center justify-center bg-gradient-to-r  from-primary to-secondary opacity-20 blur-[69px] will-change-transform" />
          <h1 className="text-5xl font-bold">Internship Management System</h1>
          <p className="my-7 max-w-lg text-center text-lg">
            A management platform for
            <strong className="mx-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              NextBean
            </strong>
            to evaluate students effectively based on the specific criteria of their schools.
          </p>
          <Link
            href={config.routes.login}
            className="group relative flex items-center rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-3 pr-10 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
          >
            Discover Now
            <FaAngleRight className="absolute right-5 ml-2 transition-all duration-300 ease-in-out group-hover:right-4" />
          </Link>
        </div>
        <Image src="/preview.png" alt="Preview" width="960" height="520" className="rounded-lg shadow-preview" />
      </main>
    </>
  )
}
