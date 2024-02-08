import { Menu, MenuProps } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useLocation, useNavigate } from 'react-router-dom'
import StatusDB from '@/infrastructure/db/StatusDB.ts'
import React, { ReactNode, useEffect, useState } from 'react'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import SideMenuDTO from '@/infrastructure/pojo/dto/SideMenuDTO.ts'
import MenuUtils from '@/infrastructure/util/common/MenuUtils.tsx'

function SideMenu() {
  const navigate = useNavigate()
  const state = StatusDB.db()
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard'])

  const handleClickLog = () => {
    setSelectedKeys([])
    navigate('/welcome')
    state.setBreadList([])
  }

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    state.setBreadList(MenuUtils.getParentLabelsByKey(key))
    navigate(key)
  }

  const { pathname } = useLocation()
  useEffect(() => {
    setSelectedKeys([pathname])
    state.setBreadList(MenuUtils.getParentLabelsByKey(pathname))
  }, [])

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLog}>
        <img src='/img/logo.png' alt='' className={styles.img} />
        {state.collapsed ? '' : <span className={styles.logoText}>Vega</span>}
      </div>
      <Menu selectedKeys={selectedKeys} mode='inline' theme='dark' items={MenuUtils.items} onClick={handleClickMenu} />
    </div>
  )
}

export default SideMenu
