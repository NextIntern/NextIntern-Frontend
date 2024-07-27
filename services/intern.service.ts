import { AxiosResponse } from "axios"
import { Intern, InternRequest, Pagination, ResponseObject } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_INTERN: "/api/v1/intern/all",
  GET_INTERN: "/api/v1/intern",
  CREATE_INTERN: "/api/v1/intern/create",
  UPDATE_INTERN: "/api/v1/intern/update",
  GET_INTERN_BY_UNIVERSITY: "/api/v1/intern/university",
  GET_INTERN_BY_CAMPAIGN: "/api/v1/intern/campaign",
}

class InternService {
  getInterns(): Promise<AxiosResponse<ResponseObject<Pagination<Intern>>>> {
    return get(END_POINT.GET_ALL_INTERN, { pageNo: 1, pageSize: 999999 })
  }

  getInternById(id: string): Promise<AxiosResponse<ResponseObject<Intern>>> {
    return get(`${END_POINT.GET_INTERN}/${id}`)
  }

  createIntern(intern: InternRequest) {
    return post(END_POINT.CREATE_INTERN, intern)
  }

  updateIntern(intern: InternRequest) {
    return put(END_POINT.UPDATE_INTERN, intern)
  }

  deleteIntern(internId: string) {
    return remove(`${END_POINT.GET_INTERN}/${internId}`)
  }

  getInternByUniversity(universityId: string): Promise<AxiosResponse<ResponseObject<Pagination<Intern>>>> {
    return get(`${END_POINT.GET_INTERN_BY_UNIVERSITY}/${universityId}`)
  }

  getInternByCampaign(campaignId: string): Promise<AxiosResponse<ResponseObject<Pagination<Intern>>>> {
    return get(`${END_POINT.GET_INTERN_BY_CAMPAIGN}/${campaignId}`)
  }
}

const internService = new InternService()
export default internService
