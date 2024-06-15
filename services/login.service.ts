import { post } from "../utils/axios"

export const END_POINT = {
  LOGIN: "/api/v1/auth/signin",
}
class LoginService {
  postLogin(username: string, password: string) {
    return post(END_POINT.LOGIN, {
      username,
      password,
    })
  }
}

const loginService = new LoginService()
export default loginService
