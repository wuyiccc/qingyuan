import styles from './index.module.less'
import ZustandDB from '@/infrastructure/db/ZustandDB.ts'
import { Button } from 'antd'

export default function Welcome() {
  const state = ZustandDB.useBearStore()

  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>Vega</div>
        <div className={styles.desc}>用另外一种方式管理Nginx配置~</div>
        <div>
          <span>{state.bears}</span>
          <Button onClick={state.increasePopulation}>增加</Button>
        </div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
