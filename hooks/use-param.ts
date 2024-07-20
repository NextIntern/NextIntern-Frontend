"use client"

import { useSearchParams } from "next/navigation"

const useUrlParameter = (paramName: string): string => {
  const searchParams = useSearchParams()

  return searchParams.get(paramName) ?? ""
}

export default useUrlParameter
