import { Descriptions } from 'antd'
import styles from './index.module.less'
export default function DashBoard() {
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
    </div>
  )
}
