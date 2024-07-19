import { AxiosResponse } from "axios"
import { DashboardCountIntern, DashboardReport, DashboardTop5Intern, ResponseObject } from "@/types"
import { get } from "@/utils/axios"

export const END_POINT = {
  GET_ITEMS: "/api/v1/dashboard/items",
  COUNT_INTERN: "/api/v1/dashboard/count-intern",
  GET_FIVE_MOST_INTERN: "/api/v1/dashboard/5-most-intern",
}

class DashboardService {
  getItems(): Promise<AxiosResponse<ResponseObject<DashboardReport[]>>> {
    return get(END_POINT.GET_ITEMS)
  }

  countIntern(): Promise<AxiosResponse<ResponseObject<DashboardCountIntern[]>>> {
    return get(END_POINT.COUNT_INTERN)
  }

  getFiveMostIntern(): Promise<AxiosResponse<ResponseObject<DashboardTop5Intern[]>>> {
    return get(END_POINT.GET_FIVE_MOST_INTERN)
  }
}

const dashboardService = new DashboardService()
export default dashboardService
