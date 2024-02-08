import { Menu, MenuProps } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useLocation, useNavigate } from 'react-router-dom'
import StatusDB from '@/infrastructure/db/StatusDB.ts'
import React, { ReactNode, useEffect, useState } from 'react'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import SideMenuDTO from '@/infrastructure/pojo/dto/SideMenuDTO.ts'

function SideMenu() {
  const navigate = useNavigate()
  const state = StatusDB.db()
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard'])

  const items: SideMenuDTO[] = [
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

  const getParentLabelsByKey = (key: string): { title: string }[] => {
    const parentLabels: { title: string }[] = []

    const findParentLabels = (items: SideMenuDTO[], currentKey: string) => {
      for (const item of items) {
        if (item.key === currentKey) {
          parentLabels.push({ title: item.label })
          break
        }

        if (item.children) {
          findParentLabels(item.children, currentKey)
          if (parentLabels.length > 0) {
            parentLabels.push({ title: item.label })
            break
          }
        }
      }
    }

    findParentLabels(items, key)
    return parentLabels.reverse()
  }

  const handleClickLog = () => {
    setSelectedKeys([])
    navigate('/welcome')
    state.setBreadList([])
  }

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    state.setBreadList(getParentLabelsByKey(key))
    navigate(key)
  }

  const { pathname } = useLocation()
  useEffect(() => {
    setSelectedKeys([pathname])
    state.setBreadList(getParentLabelsByKey(pathname))
  }, [])

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
