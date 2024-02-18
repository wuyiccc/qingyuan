import styles from './index.module.less'
import { UserOutlined } from '@ant-design/icons'

export default function UserManageLogo() {
  return (
    <div className={styles.userManageLogoWrapper}>
      <UserOutlined className={styles.userManageLogo} />
    </div>
  )
}
