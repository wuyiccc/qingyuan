import React from 'react'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, MenuProps, Switch } from 'antd'
import styles from './index.module.less'

function NavHeader() {
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '邮箱: 3406324191@qq.com'
    },
    {
      key: '2',
      label: '退出'
    }
  ]

  return (
    <div className={styles.naviHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickName}>wuyiccc</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
