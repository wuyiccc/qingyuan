import ObjectUtils from '@/util/common/ObjectUtils.ts'
import StringUtils from '@/util/common/StringUtils.ts'

class DateUtils {
  public static DATE_FORMAT: string = 'yyyy-MM-dd'

  public static HOUR_TIME_FORMAT: string = 'HH:mm:sss'

  public static DATETIME_FORMAT: string = 'yyyy-MM-dd HH:mm:ss'

  public static toLocalDate(date?: Date, format?: string) {
    let curDate = new Date()
    if (ObjectUtils.nonNull(date)) {
      curDate = date!
    }

    if (StringUtils.equals(format, DateUtils.DATE_FORMAT)) {
      return curDate.toLocaleDateString().replaceAll(StringUtils.SLASH, StringUtils.DASHED)
    }
    if (StringUtils.equals(format, DateUtils.HOUR_TIME_FORMAT)) {
      return curDate.toLocaleTimeString().replaceAll(StringUtils.SLASH, StringUtils.DASHED)
    }

    return curDate.toLocaleString().replaceAll(StringUtils.SLASH, StringUtils.DASHED)
  }

  public static formatDate(date?: Date, format?: string) {
    let curDate = new Date()
    if (date instanceof Date) curDate = date
    else if (date) curDate = new Date(date)

    let fmt = format || DateUtils.DATETIME_FORMAT
    fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
    type DateUnit = {
      [key: string]: number
    }
    const dateUnit: DateUnit = {
      'M+': curDate.getMonth() + 1,
      'd+': curDate.getDate(),
      'H+': curDate.getHours(),
      'm+': curDate.getMinutes(),
      's+': curDate.getSeconds()
    }
    for (const k in dateUnit) {
      fmt = fmt.replace(new RegExp(`(${k})`), dateUnit[k] > 9 ? dateUnit[k].toString() : '0' + dateUnit[k].toString())
    }
    return fmt
  }
}

export default DateUtils
