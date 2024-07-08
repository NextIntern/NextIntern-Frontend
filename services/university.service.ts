import { AxiosResponse } from "axios"
import { ResponseObject, University, UniversityRequest } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_UNIVERSITY: "/api/v1/university/all",
  GET_UNIVERSITY: "/api/v1/university",
  CREATE_UNIVERSITY: "/api/v1/university/create",
  UPDATE_UNIVERSITY: "/api/v1/university/update",
}

class UniversityService {
  getUniversities(): Promise<AxiosResponse<ResponseObject<University[]>>> {
    return get(END_POINT.GET_ALL_UNIVERSITY)
  }

  getUniversityById(universityId: string) {
    return get(`${END_POINT.GET_UNIVERSITY}/${universityId}`)
  }

  deleteUniversity(universityId: string) {
    return remove(`${END_POINT.GET_UNIVERSITY}/${universityId}`)
  }

  createUniversity(university: UniversityRequest) {
    return post(END_POINT.CREATE_UNIVERSITY, university)
  }

  updateUniversity(university: UniversityRequest) {
    return put(END_POINT.UPDATE_UNIVERSITY, university)
  }
}

const universityService = new UniversityService()
export default universityService
