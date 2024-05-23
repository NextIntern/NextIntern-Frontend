import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "NextIntern",
  description: "NextIntern - Internship Managemenet System for NextBean Text",
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
    <div className="flex min-h-full flex-col">
      <section className="grow">
        <div className="container mx-auto mt-20 max-w-4xl rounded-lg bg-white p-10 text-center shadow-xl">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              NextIntern
            </span>{" "}
            - Internship Management System
          </h1>
          <p className="subheading text-md mb-12 font-semibold">Something amazing will be constructed here...</p>
          <div className="mb-8 flex justify-center">
            <Image src="/comming-soon.png" alt="Comming soon" width="500" height="250" />
          </div>
          <p className="text text-sm tracking-wide">
            For further information please contact via email:
            <a href="mailto:contact@hdang09.tech" className="mail ml-1 font-black text-blue-600">
              contact@hdang09.tech
            </a>
          </p>
        </div>
      </section>
      <footer className="container mx-auto flex max-w-4xl items-center justify-between py-6 text-xs text-gray-400">
        <div className="left-side flex items-center">
          <p>
            Powered by{" "}
            <a href="https://hdang09.tech" className="text-black">
              hdang09.tech
            </a>
          </p>
        </div>
        <p>Created at: Tue May 14 00:22:41 2024</p>
      </footer>
    </div>
  )
}
