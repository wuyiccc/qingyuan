import { IMenuBarItem, ISidebarPane } from '@dtinsight/molecule/esm/model'
import LeftBarConstants from '@/infrastructure/constants/LeftBarConstants.ts'
import React from 'react'
import { UserManageSideBarView } from '@/extension/UserManage/component/UserManageSideBarView'

const userManageSideBar: ISidebarPane = {
  id: LeftBarConstants.LEFT_BAR_USER_MANAGE,
  title: LeftBarConstants.LEFT_BAR_USER_MANAGE,
  render: () => {
    return <UserManageSideBarView />
  }
}

export default userManageSideBar
