import { AxiosResponse } from "axios"

import { get, post } from "@/utils/axios"
import { UniversityRequest } from "@/types"

export const END_POINT = {
 
  CREATE_UNIVERSITY: "/api/University/university",
}

class UniversityService {
  

  createUniversity(university : UniversityRequest) {
    return post(END_POINT.CREATE_UNIVERSITY, university)
  }
}

const universityService = new UniversityService()
export default universityService
