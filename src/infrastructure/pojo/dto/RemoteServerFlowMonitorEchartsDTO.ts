import RemoteServerFlowMonitorEntity from '@/infrastructure/pojo/entity/RemoteServerFlowMonitorEntity.ts'

class RemoteServerFlowMonitorEchartsDTO {
  public serverNameList: string[]

  public dateList: string[]

  public flowDataListWithServerList: FlowDataDTO[]

  public static toRemoteServerFlowMonitorEchartsDTO(entity: RemoteServerFlowMonitorEntity) {
    const dto = new RemoteServerFlowMonitorEchartsDTO()
    dto.serverNameList = entity.serverNameList
    dto.dateList = entity.dateList
    dto.flowDataListWithServerList = []

    for (let i = 0; i < dto.serverNameList.length; i++) {
      const flowDataDTO = new FlowDataDTO()
      flowDataDTO.name = dto.serverNameList[i]
      flowDataDTO.type = 'line'
      flowDataDTO.data = entity.flowDataListWithServerList[i]
      dto.flowDataListWithServerList[i] = flowDataDTO
    }
    return dto
  }
}

class FlowDataDTO {
  public name: string

  public type: string

  public data: number[]
}

export default RemoteServerFlowMonitorEchartsDTO
