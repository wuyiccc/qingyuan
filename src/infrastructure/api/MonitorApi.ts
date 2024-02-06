import RemoteServerFlowMonitorEntity from '@/infrastructure/pojo/entity/RemoteServerFlowMonitorEntity.ts'
import request from '@/infrastructure/api/request.ts'

class MonitorApi {
  public static PREFIX_URL: string = '/monitor'

  public static async getRemoteServerFlowMonitorData(): Promise<RemoteServerFlowMonitorEntity> {
    return await request.get(MonitorApi.PREFIX_URL + '/getRemoteServerFlowMonitorData', null, null)
  }
}

export default MonitorApi
