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
  campaignEdit: "/dashboard/campaign/edit/:id",
  campaignDetail: "/dashboard/campaign/:id",
}

export default routes
