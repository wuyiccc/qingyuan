import { Button, Card, Descriptions } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import StatusDB from '@/infrastructure/db/StatusDB.ts'
import userEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import RemoteServerApi from '@/infrastructure/api/RemoteServerApi.ts'
export default function DashBoard() {
  const userEntity = StatusDB.db(state => state.userEntity)

  const [remoteServerCount, setRemoteServerCount] = useState<number>()

  useEffect(() => {
    getRemoteServerCount()
  }, [])

  const getRemoteServerCount = async () => {
    const remoteServerCount = await RemoteServerApi.getRemoteServerCount()
    setRemoteServerCount(remoteServerCount)
  }

  useEffect(() => {
    const lineChartDom = document.getElementById('lineChart')
    const chartInstance = echarts.init(lineChartDom as HTMLElement)

    chartInstance.setOption({
      title: {
        text: '流量监控图',
        left: '1%'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['服务器1', '服务器2']
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '服务器1',
          type: 'line',
          data: [10, 20, 30, 40, 50, 60]
        },
        {
          name: '服务器2',
          type: 'line',
          data: [12, 22, 32, 12, 2, 102]
        }
      ]
    })
  }, [])

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
        <Card title='服务器监控 流量监控' extra={<Button type='primary'>刷新</Button>}>
          <div id='lineChart' className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
