import { AxiosResponse } from "axios"
import { Campaign, CampaignRequest, ResponseObject } from "@/types"
import { get, post } from "@/utils/axios"

export const END_POINT = {
  GET_CAMPAIGN: "/api/Campaign/campaigns",
  CREATE_CAMPAIGN: "/api/Campaign/campaign",
}

class CampaignService {
  getCampaigns(): Promise<AxiosResponse<ResponseObject<Campaign[]>>> {
    return get(END_POINT.GET_CAMPAIGN)
  }

  getCampaignById(id: string): Promise<AxiosResponse<ResponseObject<Campaign>>> {
    return get(`${END_POINT.GET_CAMPAIGN}/${id}`)
  }

  createCampaign(campaign: CampaignRequest) {
    return post(END_POINT.CREATE_CAMPAIGN, campaign)
  }
}

const campaignService = new CampaignService()
export default campaignService
