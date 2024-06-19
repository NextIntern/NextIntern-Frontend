import { AxiosResponse } from "axios"
import { ResponseObject, Role } from "@/types"
import { get } from "@/utils/axios"

export const END_POINT = {
  GET_ALL_ROLE: "/api/v1/role",
}
class RoleService {
  getAllRole(): Promise<AxiosResponse<ResponseObject<Role[]>>> {
    return get(END_POINT.GET_ALL_ROLE)
  }
}

const roleService = new RoleService()
export default roleService
