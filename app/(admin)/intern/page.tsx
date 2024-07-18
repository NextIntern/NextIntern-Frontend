"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import { MdCake, MdMail, MdOutlineTransgender, MdPhone } from "react-icons/md"
import config from "@/config"
import { internService } from "@/services"

export default function Page() {
  const { data: interns, refetch } = useQuery({
    queryKey: ["interns"],
    queryFn: () => internService.getInterns(),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (internId: string) => {
    try {
      await internService.deleteIntern(internId)
      toast.success("Internship deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete this internship.")
    }
  }

  const filteredInternship = Array.isArray(interns)
    ? interns.filter((intern) => intern.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  return (
    <section className="container mx-auto px-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Internship</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {filteredInternship?.length ?? 0} internships
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These internships has been created.</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          placeholder="Search internship..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link
          href={config.routes.internshipCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add Internship
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredInternship.map((intern) => (
          <div
            key={intern.userId}
            className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-col items-center py-6">
              <Image
                className="mb-3 h-24 w-24 rounded-full p-4 shadow-lg"
                src={intern.imgUrl || "/logo.png"}
                alt={intern.fullname}
                width={96}
                height={96}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{intern.fullname}</h5>
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MdMail /> {intern.email}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MdOutlineTransgender /> {intern.gender}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MdCake /> {intern.dob}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MdPhone /> {intern.telephone}
              </span>
              <div className="mt-4 flex md:mt-6">
                <Link
                  href={`${config.routes.internshipEdit}?internId=${intern.userId}`}
                  className="inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Edit
                </Link>
                <div
                  onClick={() => handleDelete(intern.userId)}
                  className="ms-2 cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-red-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredInternship.length === 0 && (
        <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-200">No internships found.</div>
      )}
      <div className="mt-6 flex items-center justify-between">
        <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Previous
        </button>
        <div className="flex items-center space-x-2">
          <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">1</button>
          <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">2</button>
          <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">3</button>
        </div>
        <button className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Next</button>
      </div>
    </section>
  )
}
