import { get } from "../utils/axios"

const getCampaigns = () => {
  return get("/campaigns")
}

const getCampaignById = (id: string) => {
  return get(`/campaigns/${id}`)
}

const campaignService = {
  getCampaigns,
  getCampaignById,
}

export default campaignService
