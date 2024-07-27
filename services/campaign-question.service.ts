import { AxiosResponse } from "axios"
import { CampaignQuestion, CampaignQuestionRequest, ResponseObject } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_CAMPAIGN_QUESTION: "/api/v1/campaign-question/all",
  GET_CAMPAIGN_QUESTION: "/api/v1/campaign-question",
  CREATE_CAMPAIGN_QUESTION: "/api/v1/campaign-question/create",
  UPDATE_CAMPAIGN_QUESTION: "/api/v1/campaign-question/update",
}

class CampaignQuestionService {
  getAll(): Promise<AxiosResponse<ResponseObject<CampaignQuestion[]>>> {
    return get(END_POINT.GET_ALL_CAMPAIGN_QUESTION, { pageNo: 1, pageSize: 999999 })
  }

  getById(id: string): Promise<AxiosResponse<ResponseObject<CampaignQuestion>>> {
    return get(`${END_POINT.GET_CAMPAIGN_QUESTION}/${id}`)
  }

  create(CampaignQuestion: CampaignQuestionRequest) {
    return post(END_POINT.CREATE_CAMPAIGN_QUESTION, CampaignQuestion)
  }

  update(CampaignQuestion: CampaignQuestionRequest) {
    return put(END_POINT.UPDATE_CAMPAIGN_QUESTION, CampaignQuestion)
  }

  delete(id: string) {
    return remove(`${END_POINT.GET_CAMPAIGN_QUESTION}/${id}`)
  }
}

const campaignQuestionService = new CampaignQuestionService()
export default campaignQuestionService
