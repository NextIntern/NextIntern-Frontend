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
    <div className="flex flex-col min-h-full">
      <section className="grow">
        <div className="container max-w-4xl mx-auto mt-20 p-10 bg-white rounded-lg shadow-xl text-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">NextIntern</span> - Internship Management System
          </h1>
          <p className="subheading text-md font-semibold mb-12">Something amazing will be constructed here...</p>
          <div className="flex justify-center mb-8">
            <Image src="/comming-soon.png" alt="Comming soon" width="500" height="250"/>
          </div>
          <p className="text text-sm tracking-wide">
            For further information please contact via email:
            <a href="mailto:contact@hdang09.tech" className="mail text-blue-600 font-black ml-1">
              contact@hdang09.tech
            </a>
          </p>
        </div>
      </section>
      <footer className="container max-w-4xl mx-auto flex justify-between items-center text-gray-400 text-xs py-6">
        <div className="left-side flex items-center">
          <p>Powered by <a href="https://hdang09.tech" className="text-black">hdang09.tech</a></p>
        </div>
        <p>Created at: Tue May 14 00:22:41 2024</p>
      </footer>
    </div>
  )
}
