import { post } from "../utils/axios"

const postLogin = (username: string, password: string) => {
  return post("/login", {
    username,
    password,
  })
}

const loginService = {  
  postLogin,
}

export default loginService
