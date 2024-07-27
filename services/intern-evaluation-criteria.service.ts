import { AxiosResponse } from "axios"
import { InternEvaluationCriteria, InternEvlCriteriaRequest, Pagination, ResponseObject, ScoreRequest } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_INTERN_EVALUATION_CRITERIA: "/api/v1/intern-evaluation-criteria/all",
  GET_INTERN_EVALUATION_CRITERIA: "/api/v1/intern-evaluation-criteria",
  CREATE_INTERN_EVALUATION_CRITERIA: "/api/v1/intern-evaluation-criteria/create",
  EVALUATE_INTERN: "/api/v1/intern-evaluation-criteria/create-list",
  UPDATE_INTERN_EVALUATION_CRITERIA: "/api/v1/intern-evaluation-criteria/update",
}

class EvaluateInternService {
  getAll(): Promise<AxiosResponse<ResponseObject<Pagination<InternEvaluationCriteria>>>> {
    return get(END_POINT.GET_ALL_INTERN_EVALUATION_CRITERIA, { pageNo: 1, pageSize: 999999 })
  }

  getById(id: string): Promise<AxiosResponse<ResponseObject<InternEvaluationCriteria>>> {
    return get(`${END_POINT.GET_INTERN_EVALUATION_CRITERIA}/${id}`)
  }

  create(internEvl: InternEvlCriteriaRequest) {
    return post(END_POINT.CREATE_INTERN_EVALUATION_CRITERIA, internEvl)
  }

  update(internEvl: InternEvlCriteriaRequest) {
    return put(END_POINT.UPDATE_INTERN_EVALUATION_CRITERIA, internEvl)
  }

  delete(internEvlId: string) {
    return remove(`${END_POINT.GET_INTERN_EVALUATION_CRITERIA}/${internEvlId}`)
  }

  evaluateIntern(scores: ScoreRequest) {
    return post(END_POINT.EVALUATE_INTERN, scores)
  }
}

const evaluateInternService = new EvaluateInternService()
export default evaluateInternService
