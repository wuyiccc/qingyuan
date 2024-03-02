import request from '@/infrastructure/api/request.ts'
import RemoteServerUpdateBO from '@/infrastructure/pojo/bo/RemoteServerUpdateBO.ts'
import RemoteServerEntity from '@/infrastructure/pojo/entity/RemoteServerEntity.ts'
import RemoteServerTestConnectBO from '@/infrastructure/pojo/bo/RemoteServerTestConnectBO.ts'
import SshCmdExecResultEntity from '@/infrastructure/pojo/entity/SshCmdExecResultEntity.ts'

class RemoteServerApi {
  public static PREFIX_URL: string = '/remoteServer'

  public static async getRemoteServerCount(): Promise<number> {
    return await request.get(RemoteServerApi.PREFIX_URL + '/getRemoteServerCount', null, null)
  }

  public static async updateRemoteServer(param: RemoteServerUpdateBO): Promise<string> {
    return await request.post(RemoteServerApi.PREFIX_URL + '/updateRemoteServer', param, null)
  }

  public static async getRemoteServerDetail(id: string): Promise<RemoteServerEntity> {
    return await request.get(RemoteServerApi.PREFIX_URL + '/getRemoteServerDetail?id=' + id, null, null)
  }

  public static async testRemoteServerConnect(param: RemoteServerTestConnectBO): Promise<SshCmdExecResultEntity> {
    return await request.post(RemoteServerApi.PREFIX_URL + '/testRemoteServerConnect', param, null)
  }
}

export default RemoteServerApi
