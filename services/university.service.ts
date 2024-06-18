import { AxiosResponse } from "axios"
import { ResponseObject, University } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_UNIVERSITY: "/api/v1/university/all",
  GET_UNIVERSITY: "/api/v1/university/{id}",

}

class UniversityService {
  getUniversities(): Promise<AxiosResponse<ResponseObject<University[]>>> {
    return get(END_POINT.GET_ALL_UNIVERSITY)
  }
  deleteUniversities(universityId: string) {
    return remove(`${END_POINT.GET_UNIVERSITY}/${universityId}`)
  }

}


const universityService = new UniversityService()
export default universityService
