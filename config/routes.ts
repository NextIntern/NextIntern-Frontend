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
}

export default routes
