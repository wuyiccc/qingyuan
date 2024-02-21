import { IExtension, IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import molecule from '@dtinsight/molecule'
import { userManageActivityBar, userManageSideBar } from '@/extension/UserManage/base.tsx'

class UserManageExtension implements IExtension {
  id: string = VegaEditorConstants.LEFT_BAR_USER_MANAGE_ID
  name: string = VegaEditorConstants.LEFT_BAR_USER_MANAGE_ID

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
