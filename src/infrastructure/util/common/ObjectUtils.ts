class ObjectUtils {
  public static nonNull(obj: object | undefined): boolean {
    if (obj !== null && obj !== undefined) {
      return true
    }
    return false
  }

  public static isNull(obj: object | undefined): boolean {
    if (obj === undefined || obj === null) {
      return true
    }

    return false
  }
}

export default ObjectUtils
