import { IExtension } from '@dtinsight/molecule/esm/model'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import LeftBarConstants from '@/infrastructure/constants/LeftBarConstants.ts'
import molecule from '@dtinsight/molecule'
import userManageActivityBar from '@/extension/UserManage/UserManageActivityBar.tsx'
import userManageSideBar from '@/extension/UserManage/UserManageSideBar.tsx'

class UserManageExtension implements IExtension {
  id: string = LeftBarConstants.LEFT_BAR_USER_MANAGE
  name: string = LeftBarConstants.LEFT_BAR_USER_MANAGE

  activate(extensionCtx: IExtensionService) {
    this.initUI()
  }

  dispose(extensionCtx: IExtensionService) {
    molecule.activityBar.remove(userManageActivityBar.id)
    molecule.sidebar.remove(userManageSideBar.id)
  }

  initUI() {
    // 1. 新增侧边栏
    molecule.activityBar.add(userManageActivityBar)
    // 2. 新增侧边栏展开列表
    molecule.sidebar.add(userManageSideBar)
  }
}

export default UserManageExtension
