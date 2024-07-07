import { AxiosResponse } from "axios"
import { FormCriteria, ResponseObject } from "@/types"
import { get, post } from "@/utils/axios"

export const END_POINT = {
  DOWNLOAD_TEMPLATE: "/api/v1/excel/download-template",
  IMPORT_INTERN: "/api/v1/excel/import-intern",
}

class FileService {
  downloadTemplate(): Promise<AxiosResponse<ResponseObject<FormCriteria[]>>> {
    return get(END_POINT.DOWNLOAD_TEMPLATE)
  }

  importIntern(formData: FormData): Promise<AxiosResponse<ResponseObject<FormCriteria>>> {
    return post(END_POINT.IMPORT_INTERN, formData)
  }
}

const fileService = new FileService()
export default fileService
