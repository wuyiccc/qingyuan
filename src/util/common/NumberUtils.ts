class NumberUtils {
  // 格式化金额
  public static formatNum(num: number | string): string {
    const a = parseFloat(num.toString())
    return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
  }
}

export default NumberUtils
