import { AxiosResponse } from "axios"
import { CampaignQuestionResponse, ResponseObject } from "@/types"
import { get, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_CAMPAIGN_QUESTION: "/api/v1/campaign-question-response/all",
  GET_CAMPAIGN_QUESTION: "/api/v1/campaign-question-response",
  CREATE_CAMPAIGN_QUESTION: "/api/v1/campaign-question-response/create",
  UPDATE_CAMPAIGN_QUESTION: "/api/v1/campaign-question-response/update",
}

class QuestionResponseService {
  getAll(): Promise<AxiosResponse<ResponseObject<CampaignQuestionResponse[]>>> {
    return get(END_POINT.GET_ALL_CAMPAIGN_QUESTION, { pageNo: 1, pageSize: 999999 })
  }

  getById(id: string): Promise<AxiosResponse<ResponseObject<CampaignQuestionResponse>>> {
    return get(`${END_POINT.GET_CAMPAIGN_QUESTION}/${id}`)
  }

  delete(id: string) {
    return remove(`${END_POINT.GET_CAMPAIGN_QUESTION}/${id}`)
  }
}

const questionResponseService = new QuestionResponseService()
export default questionResponseService
