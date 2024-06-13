import { AxiosResponse } from "axios"
import { Campaign, ResponseObject } from "@/types"
import { get } from "@/utils/axios"

export const END_POINT = {
  GET_CAMPAIGN: "/api/Campaign/campaigns",
}

export const getCampaigns = (): Promise<AxiosResponse<ResponseObject<Campaign[]>>> => {
  return get(END_POINT.GET_CAMPAIGN)
}

const getCampaignById = (id: string): Promise<AxiosResponse<ResponseObject<Campaign>>> => {
  return get(`${END_POINT.GET_CAMPAIGN}/${id}`)
}
const campaignService = {
  getCampaigns,
  getCampaignById,
}

export default campaignService
