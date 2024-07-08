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

export type UniversityRequest = {
  universityName: string
  address: string
  phone: number
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

export type InternRequest = {
  username: string
  password: string
  confirmedPassword: string
  fullname: string
  email: string
  gender: string
  telephone: string
  dob: string
  roleName: string
  address: string
  id?: string
  menterUsername?: string
  campaignId?: string
  deletedDate?: Date
  evaluationFormId?: string
}
export type EvaluationForm = {
  evaluationFormId: string
  university: University
  isActive: boolean
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
  universityName: string
}

export type FormCriteriaRequest = {
  id: string
  formCriteriaName: string
  guide: string
  minScore: number
  maxScore: number
  evaluationFormId: string
}

export type Role = {
  roleId: string
  roleName: string
}

export type CampaignEvaluation = {
  campaignEvaluationId: string
  campaignId: string
  campaignName: string
  startDate: Date
  endDate: Date
}

export type CampaignEvaluationRequest = {
  id: string
  campaignId: string
  startDate: string
  endDate: string
}

export type InternEvaluation = {
  internEvaluationId: string
  internId: string
  internName: string
  campaignEvaluationId: string
  feedback: string
}

export type InternEvlRequest = {
  id: string
  internId: string
  campaignEvaluationId: string
  feedback: string
}
