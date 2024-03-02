import RemoteServerFlowMonitorEntity from '@/infrastructure/pojo/entity/RemoteServerFlowMonitorEntity.ts'
import request from '@/infrastructure/api/request.ts'
import NginxServiceDetailEntity from '@/infrastructure/pojo/entity/NginxServiceDetailEntity.ts'
import NginxServiceUpdateBO from '@/infrastructure/pojo/bo/NginxServiceUpdateBO.ts'
import NginxServiceTestConnectBO from '@/infrastructure/pojo/bo/NginxServiceTestConnectBO.ts'
import SshCmdExecResultEntity from '@/infrastructure/pojo/entity/SshCmdExecResultEntity.ts'

export default class NginxServiceApi {
  public static PREFIX_URL: string = '/nginxService'

  public static async updateNginxService(param: NginxServiceUpdateBO): Promise<string> {
    return await request.post(NginxServiceApi.PREFIX_URL + '/updateNginxService', param, null)
  }

  public static async getNginxServiceDetail(id: string): Promise<NginxServiceDetailEntity> {
    return await request.get(NginxServiceApi.PREFIX_URL + '/getNginxServiceDetail?id=' + id, null, null)
  }

  public static async testNginxServiceConnect(param: NginxServiceTestConnectBO): Promise<SshCmdExecResultEntity> {
    return await request.post(NginxServiceApi.PREFIX_URL + '/testNginxServiceConnect', param, null)
  }
}
