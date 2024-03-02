import NginxServiceBindHistoryEntity from '@/infrastructure/pojo/entity/NginxServiceBindHistoryEntity.ts'

export default class NginxServiceDetailEntity {
  public id?: string

  public serviceName?: string

  public nginxCmdPath?: string

  public nginxConfPath?: string

  public remark?: string

  public gmtCreate?: string

  public gmtModified?: string

  public bindConfHistoryVOList: NginxServiceBindHistoryEntity[]
}
