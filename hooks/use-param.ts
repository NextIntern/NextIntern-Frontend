import { useEffect, useState } from "react"

const useUrlParameter = (paramName: string) => {
  const [paramValue, setParamValue] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const value = params.get(paramName) ?? ""
    setParamValue(value)
  }, [paramName])

  return paramValue
}

export default useUrlParameter
