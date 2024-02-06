import request from '@/infrastructure/api/request.ts'

class RemoteServerApi {
  public static PREFIX_URL: string = '/remoteServer'

  public static async getRemoteServerCount(): Promise<number> {
    return await request.get(RemoteServerApi.PREFIX_URL + '/getRemoteServerCount', null, null)
  }
}

export default RemoteServerApi
