class UrlUtils {
  isSubPath(pathname: string): boolean {
    return pathname.split("/").length > 2
  }
}

const urlUtils = new UrlUtils()
export default urlUtils
