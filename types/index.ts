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
  startDate: Date
  endDate: Date
  createDate: string
  modifyDate: string
  status: string
}

export type ResponseObject<T> = {
  data: T
  message: string
  status: number
}

export type University = {
  universityId: string
  universityName: string
  address: string
  phone: string
  createDate: Date
  modifyDate: Date
  deletedDate?: Date
}

export type Intern = {
  userId: string
  id: number
  username: string
  fullname: string
  dob: string
  gender: string
  telephone: string
  email: string
  address: string
  mentor?: string
  campaign?: string
  createDate: Date
  modifyDate: Date
  deletedDate?: Date
}

export type EvaluationFormRequest = {
  id: string
  universityId: string
  isActive: boolean
}

export type FormCriteria = {
  formCriteriaId: string
  name: string
  guide: string
  minScore: number
  maxScore: number
  deletedDate?: Date
  evaluationFormId: string
}

export type FormCriteriaRequest = {
  id: string
  formCriteriaName: string
  guide: string
  minScore: number
  maxScore: number
  evaluationFormId: string
}
