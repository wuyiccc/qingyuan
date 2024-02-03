import request from '@/infrastructure/api/request.ts'
import { Button } from 'antd'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import NumberUtils from '@/infrastructure/util/common/NumberUtils.ts'
import DateUtils from '@/infrastructure/util/common/DateUtils.ts'

import styles from './index.module.less'

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
