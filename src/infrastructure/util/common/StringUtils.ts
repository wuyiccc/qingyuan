class StringUtils {
  static readonly EMPTY: string = ''

  static readonly SLASH: string = '/'

  static readonly UNDERLINE: string = '_'

  static readonly DASHED: string = '-'

  static readonly EQUAL: string = '='

  public static equals(str1?: string, str2?: string) {
    return str1 === str2
  }

  public static isEmpty(str: string | undefined): boolean {
    if (str === undefined || str === null) {
      return true
    }
    return str.trim() === ''
  }

  public static isNotEmpty(str: string | undefined): boolean {
    return !StringUtils.isEmpty(str)
  }
}

export default StringUtils
