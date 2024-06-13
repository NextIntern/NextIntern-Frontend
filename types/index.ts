// Put your types here
export type CampaignRequest = {
  campaignName: string
  universityId: string
  startDate: string
  endDate: string
}

export type DateDetails = {
  year: number
  month: number
  day: number
  dayOfWeek: number
  dayOfYear: number
  dayNumber: number
}

export type Campaign = {
  campaignId: string
  id: number
  campaignName: string
  universityId: string
  universityName: string
  startDate: DateDetails
  endDate: DateDetails
  createDate: string
  modifyDate: string
  status: string
}

export type ResponseObject<T> = {
  data: T
  message: string
  status: number
}
