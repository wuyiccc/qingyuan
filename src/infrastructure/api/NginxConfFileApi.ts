import SelectEntity from '@/infrastructure/pojo/entity/SelectEntity.ts'
import request from '@/infrastructure/api/request.ts'
import NginxConfFileDetailEntity from '@/infrastructure/pojo/entity/NginxConfFileDetailEntity.ts'
import NginxConfFileUpdateBO from '@/infrastructure/pojo/bo/NginxConfFileUpdateBO.ts'
import NginxConfFilePublishBO from '@/infrastructure/pojo/bo/NginxConfFilePublishBO.ts'

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

  public static async getNginxHistoryConfFileDetail(id: string): Promise<NginxConfFileDetailEntity> {
    return await request.get(NginxConfFileApi.PREFIX_URL + '/getNginxHistoryConfFileDetail?id=' + id, null, null)
  }

  public static async getNginxConfFileBindNginxServiceList(historyFileId: string): Promise<NginxConfFileDetailEntity> {
    return await request.get(
      NginxConfFileApi.PREFIX_URL + '/getNginxConfFileBindNginxServiceList?historyFileId=' + historyFileId,
      null,
      null
    )
  }

  public static async publish(param: NginxConfFilePublishBO): Promise<string> {
    return await request.post(NginxConfFileApi.PREFIX_URL + '/publish', param, null)
  }
}
