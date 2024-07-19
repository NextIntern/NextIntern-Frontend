import { AxiosResponse } from "axios"
import { CampaignEvaluation, CampaignEvaluationRequest, Pagination, ResponseObject } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_CAMPAIGN_EVALUATION: "/api/v1/campaign-evaluation/all",
  GET_CAMPAIGN_EVALUATION: "/api/v1/campaign-evaluation",
  CREATE_CAMPAIGN_EVALUATION: "/api/v1/campaign-evaluation/create",
  UPDATE_CAMPAIGN_EVALUATION: "/api/v1/campaign-evaluation/update",
}

class CampaignEvaluationService {
  getCampaignEvaluations(): Promise<AxiosResponse<ResponseObject<Pagination<CampaignEvaluation>>>> {
    return get(END_POINT.GET_ALL_CAMPAIGN_EVALUATION, { pageNo: 1, pageSize: 999999 })
  }

  getCampaignEvaluationById(id: string): Promise<AxiosResponse<ResponseObject<CampaignEvaluation>>> {
    return get(`${END_POINT.GET_CAMPAIGN_EVALUATION}/${id}`)
  }

  createCampaignEvaluation(campaignEvaluation: CampaignEvaluationRequest) {
    return post(END_POINT.CREATE_CAMPAIGN_EVALUATION, campaignEvaluation)
  }

  updateCampaignEvaluation(campaignEvaluation: CampaignEvaluationRequest) {
    return put(END_POINT.UPDATE_CAMPAIGN_EVALUATION, campaignEvaluation)
  }

  deleteCampaignEvaluation(campaignEvaluationId: string) {
    return remove(`${END_POINT.GET_CAMPAIGN_EVALUATION}/${campaignEvaluationId}`)
  }
}

const campaignEvaluationService = new CampaignEvaluationService()
export default campaignEvaluationService
