import { Dayjs } from "dayjs"

export type InternshipFormType = {
  username: string
  password: string
  fullname: string
  email: string
  gender: string
  telephone: string
  dob: Dayjs
  roleName: string
  address: string
}
