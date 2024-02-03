import React from 'react'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, MenuProps, Switch } from 'antd'
import styles from './index.module.less'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'

function NavHeader() {
  const userEntity: UserEntity = LocalDB.get('userEntity')

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
      label: userEntity.username
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
          <span className={styles.nickName}>{userEntity.nickname}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
