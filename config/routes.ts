const routes = {
  // Unauth routes
  home: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  notFound: "/404",
  // Dashboard routes
  dashboard: "/dashboard",
  // Campaign routes
  campaignList: "/dashboard/campaign",
  campaignCreate: "/dashboard/campaign/create",
  campaignEdit: "/dashboard/campaign/edit",
  campaignDetail: "/dashboard/campaign",
  // University routes
  universityList: "/dashboard/unviversity",
  universtyCreate: "/dashboard/university/create",
  universityEdit: "/dashboard/campaign/edit",
  universityDetail: "/dashboard/campaign",
  
  // Evaluation form routes
  evaluationFormList: "/dashboard/evaluation-form",
  evaluationFormCreate: "/dashboard/evaluation-form/create",
  evaluationFormEdit: "/dashboard/evaluation-form/edit",
  // Form criteria
  formCriteriaList: "/dashboard/form-criteria",
  formCriteriaCreate: "/dashboard/form-criteria/create",
  formCriteriaEdit: "/dashboard/form-criteria/edit",
}

export default routes
