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
  // Campaign Evaluation routes
  campaignEvlList: "/dashboard/campaign-evaluation",
  campaignEvlCreate: "/dashboard/campaign-evaluation/create",
  campaignEvlEdit: "/dashboard/campaign-evaluation/edit",
  // University routes
  universityList: "/dashboard/university",
  universtyCreate: "/dashboard/university/create",
  universityEdit: "/dashboard/university/edit",
  // Evaluation form routes
  evaluationFormList: "/dashboard/evaluation-form",
  evaluationFormCreate: "/dashboard/evaluation-form/create",
  evaluationFormEdit: "/dashboard/evaluation-form/edit",
  // Internship routes
  internshipList: "/dashboard/intern",
  internshipCreate: "/dashboard/intern/create",
  internshipEdit: "/dashboard/intern/edit",
  // Form criteria
  formCriteriaList: "/dashboard/form-criteria",
  formCriteriaCreate: "/dashboard/form-criteria/create",
  formCriteriaEdit: "/dashboard/form-criteria/edit",
  // Internship evaluation routes
  internEvlList: "/dashboard/intern-evaluation",
  internEvlCreate: "/dashboard/intern-evaluation/create",
  internEvlEdit: "/dashboard/intern-evaluation/edit",
}

export default routes
