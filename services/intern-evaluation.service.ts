import { AxiosResponse } from "axios"
import { InternEvaluation, InternEvlRequest, ResponseObject } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_INTERN_EVALUATION: "/api/v1/intern-evaluation/all",
  GET_INTERN_EVALUATION: "/api/v1/intern-evaluation",
  CREATE_INTERN_EVALUATION: "/api/v1/intern-evaluation/create",
  UPDATE_INTERN_EVALUATION: "/api/v1/intern-evaluation/update",
}

class InternEvaluationService {
  getInternEvls(): Promise<AxiosResponse<ResponseObject<InternEvaluation[]>>> {
    return get(END_POINT.GET_ALL_INTERN_EVALUATION)
  }

  getInternEvlById(id: string): Promise<AxiosResponse<ResponseObject<InternEvaluation>>> {
    return get(`${END_POINT.GET_INTERN_EVALUATION}/${id}`)
  }

  createInternEvl(internEvl: InternEvlRequest) {
    return post(END_POINT.CREATE_INTERN_EVALUATION, internEvl)
  }

  updateInternEvl(internEvl: InternEvlRequest) {
    return put(END_POINT.UPDATE_INTERN_EVALUATION, internEvl)
  }

  deleteInternEvl(internevlId: string) {
    return remove(`${END_POINT.GET_INTERN_EVALUATION}/${internevlId}`)
  }
}

const internEvaluationService = new InternEvaluationService()
export default internEvaluationService
