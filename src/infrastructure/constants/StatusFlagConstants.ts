export default class StatusFlagConstants {
  public type: number

  public desc: string

  constructor(type: number, desc: string) {
    this.type = type
    this.desc = desc
  }

  public static readonly DISABLE = new StatusFlagConstants(0, '禁用')

  public static readonly ENABLE = new StatusFlagConstants(1, '启用')
}
