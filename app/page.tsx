import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

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
        url: "https://nextintern.tech/og-image.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow transition-all">
        <div className="mx-auto w-[1260px] max-w-[calc(100%-48px)]">
          <div className="flex items-center justify-between py-5">
            <a className="inline-flex shrink-0 items-center justify-center gap-[10px]" href="/">
              <Image src="/logo.png" width={36} height={36} alt="NextIntern" />
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-2xl font-extrabold text-transparent">
                NextIntern
              </span>
            </a>

            <Link
              href="/login"
              className="focus-visible:ring-ring inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-primary px-7 py-2 text-base font-semibold text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="pb-24 pt-20">
          <div className="mx-auto w-[1260px] max-w-[calc(100%-48px)]">
            <div className="flex gap-40">Hello</div>
          </div>
        </section>
      </main>
    </>
  )
}
