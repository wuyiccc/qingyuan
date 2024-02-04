import React from 'react'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, MenuProps, Switch } from 'antd'
import styles from './index.module.less'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import RessoDB from '@/infrastructure/db/RessoDB.ts'
import HttpHeaderConstants from '@/infrastructure/constants/HttpHeaderConstants.ts'
import RedirectUtils from '@/infrastructure/util/common/RedirectUtils.ts'

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
      key: 'username',
      label: RessoDB.store.userEntity.username
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      LocalDB.remove(HttpHeaderConstants.TOKEN)
      RedirectUtils.toLoginPage()
    }
  }

  return (
    <div className={styles.naviHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{RessoDB.store.userEntity.nickname}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
