import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import StatusDB from '@/infrastructure/db/StatusDB.ts'

function SideMenu() {
  const navigate = useNavigate()
  const state = StatusDB.db()
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: 3,
          icon: <TeamOutlined />
        }
      ]
    }
  ]

  const handleClick = () => {
    navigate('/welcome')
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClick}>
        <img src='/img/logo.png' alt='' className={styles.img} />
        {state.collapsed ? '' : <span className={styles.logoText}>Vega</span>}
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items} />
    </div>
  )
}

export default SideMenu
