import RemoteServerFlowMonitorEntity from '@/infrastructure/pojo/entity/RemoteServerFlowMonitorEntity.ts'
import request from '@/infrastructure/api/request.ts'
import SelectEntity from '@/infrastructure/pojo/entity/SelectEntity.ts'
import DevFileCreateBO from '@/infrastructure/pojo/bo/DevFileCreateBO.ts'
import DevFileUpdateBO from '@/infrastructure/pojo/bo/DevFileUpdateBO.ts'
import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
import DevFileDetailEntity from '@/infrastructure/pojo/entity/DevFileDetailEntity.ts'

class DevFileApi {
  public static PREFIX_URL: string = '/devFile'

  public static async getDevFileTypeList(): Promise<SelectEntity<number>[]> {
    return await request.get(DevFileApi.PREFIX_URL + '/getDevFileTypeList', null, null)
  }

  public static async addDevFile(param: DevFileCreateBO): Promise<string> {
    return await request.post(DevFileApi.PREFIX_URL + '/addDevFile', param, null)
  }

  public static async removeDevFile(id: string): Promise<string> {
    return await request.post(DevFileApi.PREFIX_URL + '/removeDevFile?id=' + id, null, null)
  }

  public static async updateDevFile(param: DevFileUpdateBO): Promise<string> {
    return await request.post(DevFileApi.PREFIX_URL + '/updateDevFile', param, null)
  }

  public static async getDevFileTree(filename: string): Promise<DevFileTreeEntity[]> {
    return await request.get(DevFileApi.PREFIX_URL + '/getDevFileTree?filename=' + filename, null, null)
  }

  public static async getDevFileDetail(id: string): Promise<DevFileDetailEntity> {
    return await request.get(DevFileApi.PREFIX_URL + '/getDevFileDetail?id=' + id, null, null)
  }
}

export default DevFileApi
