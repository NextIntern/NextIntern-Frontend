import { Dayjs } from "dayjs"

export type CampaignFormType = {
  campaignName: string
  startDate: Dayjs
  endDate: Dayjs
  universityId: string
}
