import { CampaignRequest } from "@/types"
import { get, post } from "@/utils/axios"

const PREFIX = "/api/Campaign"

const getCampaigns = () => {
  return get(`${PREFIX}/campaigns`)
}

const createCampaign = (campaign: CampaignRequest) => {
  return post(`${PREFIX}/campaign`, campaign)
}

const getCampaignById = (id: string) => {
  return get(`/campaigns/${id}`)
}

const campaignService = {
  getCampaigns,
  getCampaignById,
  createCampaign,
}

export default campaignService
