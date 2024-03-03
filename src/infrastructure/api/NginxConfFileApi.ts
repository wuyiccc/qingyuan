import SelectEntity from '@/infrastructure/pojo/entity/SelectEntity.ts'
import request from '@/infrastructure/api/request.ts'
import NginxConfFileDetailEntity from '@/infrastructure/pojo/entity/NginxConfFileDetailEntity.ts'
import NginxConfFileUpdateBO from '@/infrastructure/pojo/bo/NginxConfFileUpdateBO.ts'
import NginxConfFilePublishBO from '@/infrastructure/pojo/bo/NginxConfFilePublishBO.ts'
import NginxConfFileHistorySimpleEntity from '@/infrastructure/pojo/entity/NginxConfFileHistorySimpleEntity.ts'

export default class NginxConfFileApi {
  public static PREFIX_URL: string = '/nginxConfFile'

  public static async getNginxConfFileDetail(id: string): Promise<NginxConfFileDetailEntity> {
    return await request.get(NginxConfFileApi.PREFIX_URL + '/getNginxConfFileDetail?id=' + id, null, null)
  }

  public static async updateNginxConfFile(param: NginxConfFileUpdateBO): Promise<string> {
    return await request.post(NginxConfFileApi.PREFIX_URL + '/updateNginxConfFile', param, null)
  }

  public static async saveVersion(param: NginxConfFileUpdateBO): Promise<string> {
    return await request.post(NginxConfFileApi.PREFIX_URL + '/saveVersion', param, null)
  }

  /**
   * 查询版本列表
   * @param id 文件id
   */
  public static async getNginxConfFileHistoryList(id: string): Promise<NginxConfFileHistorySimpleEntity[]> {
    return await request.get(NginxConfFileApi.PREFIX_URL + '/getNginxConfFileHistoryList?id=' + id, null)
  }

  /**
   * 查询版本历史文件内容
   * @param historyFileId 历史文件id
   */
  public static async getNginxHistoryConfFileDetail(historyFileId: string): Promise<NginxConfFileDetailEntity> {
    return await request.get(
      NginxConfFileApi.PREFIX_URL + '/getNginxHistoryConfFileDetail?historyFileId=' + historyFileId,
      null,
      null
    )
  }

  /**
   * 查询nginx配置文件绑定的nginx服务列表
   * @param historyFileId 历史文件id
   */
  public static async getNginxConfFileBindNginxServiceList(historyFileId: string): Promise<NginxConfFileDetailEntity> {
    return await request.get(
      NginxConfFileApi.PREFIX_URL + '/getNginxConfFileBindNginxServiceList?historyFileId=' + historyFileId,
      null,
      null
    )
  }

  /**
   * 发布文件
   * @param param 发布文件参数
   */
  public static async publish(param: NginxConfFilePublishBO): Promise<string> {
    return await request.post(NginxConfFileApi.PREFIX_URL + '/publish', param, null)
  }
}
