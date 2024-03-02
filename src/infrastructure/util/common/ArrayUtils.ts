class ArrayUtils {
  public static isEmpty(array: any[] | undefined | null): boolean {
    if (array === undefined || array === null || array.length === 0) {
      return true
    }

    return false
  }

  public static isNotEmpty(array: any[] | undefined | null): boolean {
    return !this.isEmpty(array)
  }
}

export default ArrayUtils
