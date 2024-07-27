class StringUtils {
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

const stringUtils = new StringUtils()
export default stringUtils
