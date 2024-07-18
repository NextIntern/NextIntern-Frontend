import { AxiosResponse } from "axios"
import { Campaign, CampaignRequest, Pagination, ResponseObject } from "@/types"
import { get, post, put, remove } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_CAMPAIGN: "/api/v1/campaign/all",
  GET_CAMPAIGN: "/api/v1/campaign",
  CREATE_CAMPAIGN: "/api/v1/campaign/create",
  UPDATE_CAMPAIGN: "/api/v1/campaign/update",
}

class CampaignService {
  getCampaigns(): Promise<AxiosResponse<ResponseObject<Pagination<Campaign>>>> {
    return get(END_POINT.GET_ALL_CAMPAIGN, { pageNo: 1, pageSize: 999999 })
  }

  getCampaignById(id: string): Promise<AxiosResponse<ResponseObject<Campaign>>> {
    return get(`${END_POINT.GET_CAMPAIGN}/${id}`)
  }

  createCampaign(campaign: CampaignRequest) {
    return post(END_POINT.CREATE_CAMPAIGN, campaign)
  }

  updateCampaign(campaign: CampaignRequest) {
    return put(END_POINT.UPDATE_CAMPAIGN, campaign)
  }

  deleteCampaign(campaignId: string) {
    return remove(`${END_POINT.GET_CAMPAIGN}/${campaignId}`)
  }
}

const campaignService = new CampaignService()
export default campaignService
