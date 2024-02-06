import ObjectUtils from '@/infrastructure/util/common/ObjectUtils.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'

class NumberUtils {
  // 格式化金额
  public static formatNum(num: number | string): string {
    if (!NumberUtils.nonNull(num)) {
      return StringUtils.EMPTY
    }
    const a = parseFloat(num.toString())
    return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
  }

  public static nonNull(num: number | string) {
    return !(num === undefined || num === null)
  }
}

export default NumberUtils
