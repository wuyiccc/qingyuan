import styles from './index.module.less'
import { FileOutlined } from '@ant-design/icons'

export default function DevFileManageActivityBar() {
  return (
    <div className={styles.devFileManageLogoWrapper}>
      <FileOutlined className={styles.devFileManageLogo} />
    </div>
  )
}
