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
  campaignState: string
}

export type Pagination<T> = {
  items: T[]
  pageCount: number
  pageNo: number
  pageSize: number
  totalCount: number
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
  imgUrl: string
}

export type University = {
  universityId: string
  universityName: string
  address: string
  phone: string
  createDate: Date
  modifyDate: Date
  deletedDate?: Date
  imgUrl: string
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
  imgUrl: string
  universityName: string
  state: string
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
  imgUrl: string
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
  evaluationForm: EvaluationForm
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

export type DashboardReport = {
  title: string
  total: number
  percentage: number
  isIncrease: boolean
}

export type DashboardCountIntern = {
  university: string
  count: number
}

export type DashboardTop5Intern = {
  internId: string
  name: string
  score: number
  internMail: string
}

export type InternEvaluationCriteria = {
  internEvaluationCriteriaId: string
  id: string
  internEvaluationDto: InternEvaluation
  formCriteriaDto: FormCriteria
  score: number
}

export type InternEvlCriteriaRequest = {
  internEvaluationCriteriaId: string
  internEvaluationId: string
  formCriteriaId: string
  score: number
}

export type CampaignQuestion = {
  campaignQuestionId: string
  campaignId: string
  question: string
  createDate: Date
  modifyDate: Date
}

export type CampaignQuestionRequest = {
  campaignQuestionId: string
  campaignId: string
}

export type InternEvlCriteriaList = {
  formCriteriaId: string
  score: number
}

export type ScoreRequest = {
  internEvaluationCriterias: InternEvlCriteriaList[]
  internId: string
  campaignEvaluationId: string
}

export type CampaignQuestionResponse = {
  campaignQuestionResponseId: string
  campaignQuestionId: string
  internId: string
  response: string
  rating: number
}
