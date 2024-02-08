import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuUtils from '@/infrastructure/util/common/MenuUtils.tsx'
import SideMenuDTO from '@/infrastructure/pojo/dto/SideMenuDTO.ts'

interface TabsItem {
  key: string
  label: string
  closable: boolean
}
export default function MyTabs() {
  const { pathname } = useLocation()
  const [tabsList, setTabsList] = useState<TabsItem[]>([{ key: '/welcome', label: '首页', closable: false }])
  const [activeKey, setActiveKey] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    addTabs()
  }, [pathname])

  // 创建页签
  const addTabs = () => {
    const menu: SideMenuDTO = MenuUtils.findSideMenuDTO(pathname)
    if (!tabsList.find(item => item.key == pathname)) {
      tabsList.push({
        key: pathname,
        label: menu?.label,
        closable: pathname !== '/welcome'
      })
    }
    setTabsList([...tabsList])
    setActiveKey(pathname)
  }

  // 路由切换
  const handleChange = (path: string) => {
    navigate(path)
  }

  const handleDel = (path: string) => {
    if (pathname === path) {
      tabsList.forEach((item, index: number) => {
        if (item.key != pathname) return
        const nextTab = tabsList[index + 1] || tabsList[index - 1]
        if (!nextTab) return
        navigate(nextTab.key)
      })
    }
    setTabsList(tabsList.filter(item => item.key != path))
  }
  return (
    <Tabs
      activeKey={activeKey}
      items={tabsList}
      tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: 'var(--dark-bg-color)' }}
      type='editable-card'
      hideAdd
      onChange={handleChange}
      onEdit={path => {
        handleDel(path as string)
      }}
    />
  )
}
