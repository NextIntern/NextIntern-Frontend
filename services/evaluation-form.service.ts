import { AxiosResponse } from "axios"
import { EvaluationForm, EvaluationFormRequest, Pagination, ResponseObject } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_EVALUATION_FORM: "/api/v1/evaluation-form/all",
  GET_EVALUATION_FORM: "/api/v1/evaluation-form",
  CREATE_EVALUATION_FORM: "/api/v1/evaluation-form/create",
  UPDATE_EVALUATION_FORM: "/api/v1/evaluation-form/update",
  GET_EVALUATION_FORM_BY_UNIVERSITY: "/api/v1/evaluation-form/university",
}

class EvaluationFormService {
  getEvaluationForms(): Promise<AxiosResponse<ResponseObject<Pagination<EvaluationForm>>>> {
    return get(END_POINT.GET_ALL_EVALUATION_FORM, { pageNo: 1, pageSize: 999999 })
  }

  getEvaluationFormById(id: string): Promise<AxiosResponse<ResponseObject<EvaluationForm>>> {
    return get(`${END_POINT.GET_EVALUATION_FORM}/${id}`)
  }

  createEvaluationForm(evaluationForm: EvaluationFormRequest) {
    return post(END_POINT.CREATE_EVALUATION_FORM, evaluationForm)
  }

  updateEvaluationForm(evaluationForm: EvaluationFormRequest) {
    return put(END_POINT.UPDATE_EVALUATION_FORM, evaluationForm)
  }

  deleteEvaluationForm(evaluationFormId: string) {
    return remove(`${END_POINT.GET_EVALUATION_FORM}/${evaluationFormId}`)
  }

  getEvlFormByUniversity(universityId: string): Promise<AxiosResponse<ResponseObject<Pagination<EvaluationForm>>>> {
    return get(`${END_POINT.GET_EVALUATION_FORM_BY_UNIVERSITY}/${universityId}`)
  }
}

const evaluationFormService = new EvaluationFormService()
export default evaluationFormService
