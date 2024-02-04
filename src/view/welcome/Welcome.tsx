import styles from './index.module.less'
import StatusDB from '@/infrastructure/db/StatusDB.ts'
import { Button } from 'antd'

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>Vega</div>
        <div className={styles.desc}>用另外一种方式管理Nginx配置~</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
