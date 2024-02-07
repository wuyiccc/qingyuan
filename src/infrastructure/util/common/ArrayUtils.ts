class ArrayUtils {
  public static isEmpty(array: any[]): boolean {
    if (array === undefined || array === null || array.length === 0) {
      return true
    }

    return false
  }
}

export default ArrayUtils
