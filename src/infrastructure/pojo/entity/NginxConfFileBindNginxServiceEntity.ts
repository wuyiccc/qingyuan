export default class NginxConfFileBindNginxServiceEntity {
  public id?: string

  public nginxConfHistoryFileId?: string

  public nginxServiceId?: string

  public nginxServiceName?: string

  public bindTime?: string

  /**
   * 绑定状态
   */
  public bindStatus: number

  /**
   * 绑定状态描述
   */
  public bindStatusDesc: string
}
