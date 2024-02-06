import { Button, Card, Descriptions } from 'antd'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import StatusDB from '@/infrastructure/db/StatusDB.ts'
import RemoteServerApi from '@/infrastructure/api/RemoteServerApi.ts'
import { useCharts } from '@/hook/useCharts.ts'
import RemoteServerFlowMonitorEchartsDTO from '@/infrastructure/pojo/dto/RemoteServerFlowMonitorEchartsDTO.ts'
import MonitorApi from '@/infrastructure/api/MonitorApi.ts'
import RemoteServerFlowMonitorEntity from '@/infrastructure/pojo/entity/RemoteServerFlowMonitorEntity.ts'

export default function DashBoard() {
  const userEntity = StatusDB.db(state => state.userEntity)

  const [remoteServerCount, setRemoteServerCount] = useState<number>()
  useEffect(() => {
    getRemoteServerCount()
  }, [])

  // 初始化折线图
  const [lineRef, lineChart] = useCharts()

  useEffect(() => {
    renderRemoteServerFlowMonitorData()
  }, [lineChart])

  const getRemoteServerCount = async () => {
    const remoteServerCount = await RemoteServerApi.getRemoteServerCount()
    setRemoteServerCount(remoteServerCount)
  }

  const renderRemoteServerFlowMonitorData = async () => {
    if (!lineChart) {
      return
    }
    const remoteServerFlowMonitorEntity = await MonitorApi.getRemoteServerFlowMonitorData()
    const dto = RemoteServerFlowMonitorEchartsDTO.toRemoteServerFlowMonitorEchartsDTO(remoteServerFlowMonitorEntity)

    lineChart?.setOption({
      title: {
        text: '流量监控图',
        left: '1%'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: dto?.serverNameList
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: dto?.dateList
      },
      yAxis: {
        type: 'value'
      },
      series: dto?.flowDataListWithServerList
    })
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img src={userEntity.faceUrl} alt='' className={styles.userImg} />
        <Descriptions title='欢迎使用Vega'>
          <Descriptions.Item label='用户ID'>{userEntity.id}</Descriptions.Item>
          <Descriptions.Item label='登录名称'>{userEntity.username}</Descriptions.Item>
          <Descriptions.Item label='用户昵称'>{userEntity.nickname}</Descriptions.Item>
          <Descriptions.Item label='备注'>{userEntity.remark}</Descriptions.Item>
          <Descriptions.Item label='创建时间'>{userEntity.gmtCreate}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>服务器数量</div>
          <div className={styles.data}>{remoteServerCount}</div>
        </div>
        <div className={styles.card}>
          <div className='title'>服务器数量</div>
          <div className={styles.data}>{remoteServerCount}</div>
        </div>
        <div className={styles.card}>
          <div className='title'>服务器数量</div>
          <div className={styles.data}>{remoteServerCount}</div>
        </div>
      </div>

      <div className={styles.chart}>
        <Card
          title='服务器监控 流量监控'
          extra={
            <Button type='primary' onClick={renderRemoteServerFlowMonitorData}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
