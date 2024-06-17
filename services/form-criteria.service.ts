import { AxiosResponse } from "axios"
import { FormCriteria, FormCriteriaRequest, ResponseObject } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_FORM_CRITERIA: "/api/v1/form-criteria/all",
  GET_FORM_CRITERIA: "/api/v1/FORM_CRITERIA",
  CREATE_FORM_CRITERIA: "/api/v1/form-criteria/create",
  UPDATE_FORM_CRITERIA: "/api/v1/form-criteria/update",
}

class FormCriteriaService {
  getFormCriterias(): Promise<AxiosResponse<ResponseObject<FormCriteria[]>>> {
    return get(END_POINT.GET_ALL_FORM_CRITERIA)
  }

  getFormCriteriaById(id: string): Promise<AxiosResponse<ResponseObject<FormCriteria>>> {
    return get(`${END_POINT.GET_FORM_CRITERIA}/${id}`)
  }

  createFormCriteria(campaign: FormCriteriaRequest) {
    return post(END_POINT.CREATE_FORM_CRITERIA, campaign)
  }

  updateFormCriteria(campaign: FormCriteriaRequest) {
    return put(END_POINT.UPDATE_FORM_CRITERIA, campaign)
  }

  deleteFormCriteria(campaignId: string) {
    return remove(`${END_POINT.GET_FORM_CRITERIA}/${campaignId}`)
  }
}

const formCriteriaService = new FormCriteriaService()
export default formCriteriaService
