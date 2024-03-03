export default class BindStatusConstants {
  public type: number

  public desc: string

  constructor(type: number, desc: string) {
    this.type = type
    this.desc = desc
  }

  public static readonly NO_BIND = new BindStatusConstants(0, '未发布')

  public static readonly BIND = new BindStatusConstants(1, '已发布')
}
