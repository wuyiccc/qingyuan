import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import StatusDB from '@/infrastructure/db/StatusDB.ts'
import React, { useState } from 'react'

function SideMenu() {
  const navigate = useNavigate()
  const state = StatusDB.db()
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard'])

  const items = [
    {
      label: '工作台',
      key: '/dashboard',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '/system',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '/userManage',
          icon: <TeamOutlined />
        },
        {
          label: '开发文件管理',
          key: '/devFileManage',
          icon: <ProfileOutlined />
        }
      ]
    }
  ]

  const handleClickLog = () => {
    setSelectedKeys([])
    navigate('/welcome')
  }

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLog}>
        <img src='/img/logo.png' alt='' className={styles.img} />
        {state.collapsed ? '' : <span className={styles.logoText}>Vega</span>}
      </div>
      <Menu selectedKeys={selectedKeys} mode='inline' theme='dark' items={items} onClick={handleClickMenu} />
    </div>
  )
}

export default SideMenu
