import { AxiosResponse } from 'axios';
import { get } from "@/utils/axios"
import { Campaign } from '@/types';

export const END_POINT = {
  GET_CAMPAIGN: "/api/Campaign/campaigns",
}


export const getCampaigns = (): Promise<AxiosResponse<Campaign[]>> => {
  return get(END_POINT.GET_CAMPAIGN);
};


const getCampaignById = (id: string): Promise<AxiosResponse<Campaign>> => {
  return get(`${END_POINT.GET_CAMPAIGN}/${id}`);
};
const campaignService = {
  getCampaigns,
  getCampaignById,
}


export default campaignService
