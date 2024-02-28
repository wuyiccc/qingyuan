import { IActivityBarItem, ISidebarPane } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import UserManageActivityBar from '@/extension/UserManage/component/UserManageActivityBar'
import React from 'react'
import UserManageSideBarView from '@/extension/UserManage/component/UserManageSideBar'
import DevFileManageActivityBar from '@/extension/DevFileManage/component/DevFileManageActivityBar'
import DevFileManageSideBarView from '@/extension/DevFileManage/component/DevFileManageSideBar'

export const devFileManageActivityBar: IActivityBarItem = {
  id: VegaEditorConstants.LEFT_BAR_DEV_FILE_MANAGE_ID,
  sortIndex: 1,
  name: VegaEditorConstants.LEFT_BAR_DEV_FILE_MANAGE_ID,
  title: VegaEditorConstants.LEFT_BAR_DEV_FILE_MANAGE_ID,
  type: 'normal',
  render: () => <DevFileManageActivityBar />
}

export const devFileManageSideBar: ISidebarPane = {
  id: VegaEditorConstants.LEFT_BAR_DEV_FILE_MANAGE_ID,
  title: VegaEditorConstants.LEFT_BAR_DEV_FILE_MANAGE_ID,
  render: () => {
    return <DevFileManageSideBarView />
  }
}
