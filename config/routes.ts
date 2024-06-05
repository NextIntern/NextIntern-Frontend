const routes = {
  unauth: {
    home: "/",
    login: "/login",
    forgotPassword: "/forgot-password",
    notFound: "/404",
  },
  auth: {
    dashboard: "/dashboard",
    campaignList: "/dashboard/campaign",
    campaignCreate: "/dashboard/campaign/create",
    campaignEdit: "/dashboard/campaign/edit/:id",
    campaignDetail: "/dashboard/campaign/:id",
  },
}

export default routes
