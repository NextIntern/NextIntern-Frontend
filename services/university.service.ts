import { AxiosResponse } from "axios"
import { ResponseObject, University } from "@/types"
import { get, post, remove } from "@/utils/axios"
import { UniversityRequest } from "@/types"

export const END_POINT = {
  GET_ALL_UNIVERSITY: "/api/v1/university/all",
  GET_UNIVERSITY: "/api/v1/university/{id}",
  CREATE_UNIVERSITY: "/api/v1/university/create",
}

class UniversityService {
  getUniversities(): Promise<AxiosResponse<ResponseObject<University[]>>> {
    return get(END_POINT.GET_ALL_UNIVERSITY)
  }
  deleteUniversities(universityId: string) {
    return remove(`${END_POINT.GET_UNIVERSITY}/${universityId}`)
  }
  createUniversity(university: UniversityRequest) {
    return post(END_POINT.CREATE_UNIVERSITY, university)
  }
}

const universityService = new UniversityService()
export default universityService
