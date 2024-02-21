import styles from './index.module.less'
import { UserOutlined } from '@ant-design/icons'

export default function UserManageActivityBar() {
  return (
    <div className={styles.userManageLogoWrapper}>
      <UserOutlined className={styles.userManageLogo} />
    </div>
  )
}
