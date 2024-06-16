import { AxiosResponse } from "axios"
import { ResponseObject, University } from "@/types"
import { get } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_UNIVERSITY: "/api/v1/university/all",
}

class UniversityService {
  getUniversities(): Promise<AxiosResponse<ResponseObject<University[]>>> {
    return get(END_POINT.GET_ALL_UNIVERSITY)
  }
}

const universityService = new UniversityService()
export default universityService
