class StringUtils {
  static readonly EMPTY: string = ''

  static readonly SLASH: string = '/'

  static readonly UNDERLINE: string = '_'

  static readonly DASHED: string = '-'

  public static equals(str1?: string, str2?: string) {
    return str1 === str2
  }
}

export default StringUtils
