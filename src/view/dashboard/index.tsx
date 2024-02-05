import { Button, Card, Descriptions } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { useEffect } from 'react'
export default function DashBoard() {
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
        <img
          src='http://minio.local.wuyiccc.com:12031/vega/QQ%E5%9B%BE%E7%89%8720210130223341.jpg'
          alt=''
          className={styles.userImg}
        />
        <Descriptions title='欢迎使用Vega'>
          <Descriptions.Item label='用户ID'>awsdad</Descriptions.Item>
          <Descriptions.Item label='登录名称'>username</Descriptions.Item>
          <Descriptions.Item label='用户昵称'>nickname</Descriptions.Item>
          <Descriptions.Item label='备注'>remark</Descriptions.Item>
          <Descriptions.Item label='创建时间'>
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>服务器数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>服务器数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>服务器数量</div>
          <div className={styles.data}>100个</div>
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
