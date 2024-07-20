"use client"

import { useQuery } from "@tanstack/react-query"
import { Image } from "antd"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import { MdLocationOn, MdPhone } from "react-icons/md"
import config from "@/config"
import universityService from "@/services/university.service"

export default function Page() {
  const { data: university, refetch } = useQuery({
    queryKey: ["university"],
    queryFn: () => universityService.getUniversities(),
    select: (data) => data.data.data.items,
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = async (universityId: string) => {
    try {
      await universityService.deleteUniversity(universityId)
      toast.success("University deleted successfully.")
      refetch()
    } catch (error) {
      toast.error("Failed to delete university.")
    }
  }

  const filteredUniversity = Array.isArray(university)
    ? university.filter((university) => university.universityName.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  return (
    <section className="container mx-auto px-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">University</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-secondary dark:bg-gray-800 dark:text-blue-400">
              {university?.length ?? 0} universities
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These univeristies has been created.</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-white pl-4 pr-9 outline-none drop-shadow dark:bg-gray-800"
          name="universityName"
          placeholder="Search universities..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link
          href={config.routes.universtyCreate}
          className="rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold leading-5 text-white transition-colors duration-300 focus:outline-none"
        >
          Add University
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredUniversity.map((uni) => (
          <div
            key={uni.universityId}
            className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
          >
            <Image
              className="mx-auto h-24 w-24 rounded-t-lg"
              src={uni.imgUrl || "/logo.png"}
              alt={uni.universityName}
            />
            <div className="p-5">
              <Link
                href={`${config.routes.universityMgmt}?universityId=${uni.universityId}`}
                className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-primary dark:text-white"
              >
                {uni.universityName}
              </Link>
              <p className="mb-3 flex items-center gap-1 font-normal text-gray-700 dark:text-gray-400">
                <MdLocationOn />
                {uni.address}
              </p>
              <p className="mb-3 flex items-center gap-1 font-normal text-gray-700 dark:text-gray-400">
                <MdPhone />
                {uni.phone}
              </p>
              <div className="mt-4 flex md:mt-6">
                <Link
                  href={`${config.routes.universityEdit}?universityId=${uni.universityId}`}
                  className="inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Edit
                </Link>
                <div
                  onClick={() => handleDelete(uni.universityId)}
                  className="ms-2 cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-red-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredUniversity.length === 0 && (
        <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-200">No universities found.</div>
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
