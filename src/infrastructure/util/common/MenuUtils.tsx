import SideMenuDTO from '@/infrastructure/pojo/dto/SideMenuDTO.ts'
import React from 'react'
import * as Icons from '@ant-design/icons'
import { DesktopOutlined, ProfileOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'

class MenuUtils {
  public static items: SideMenuDTO[] = [
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

  public static getParentLabelsByKey = (key: string): { title: string }[] => {
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

    findParentLabels(MenuUtils.items, key)
    return parentLabels.reverse()
  }

  public static findSideMenuDTO(key: string) {
    return MenuUtils.doFindSideMenu(key, MenuUtils.items)
  }

  private static doFindSideMenu(key: string, items: SideMenuDTO[]) {
    if (!items || items.length === 0) {
      return null
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.key === key) {
        return item
      }

      if (item.children) {
        return MenuUtils.doFindSideMenu(key, item.children)
      }
    }
    return null
  }
}

export default MenuUtils
