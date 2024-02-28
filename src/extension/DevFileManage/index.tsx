import { IExtension } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import { cloneDeep } from 'lodash'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import Api from '@/api'
import molecule from '@dtinsight/molecule'
import { devFileManageActivityBar, devFileManageSideBar } from '@/extension/DevFileManage/base.tsx'

class DevFileManageExtension implements IExtension {
  id: string = VegaEditorConstants.LEFT_BAR_DEV_FILE_MANAGE_ID
  name: string = VegaEditorConstants.LEFT_BAR_DEV_FILE_MANAGE_ID

  activate(extensionCtx: IExtensionService) {
    this.initUI()
  }

  dispose(extensionCtx: IExtensionService) {
    molecule.activityBar.remove(devFileManageActivityBar.id)
    molecule.sidebar.remove(devFileManageSideBar.id)
  }

  async initUI() {
    molecule.activityBar.add(devFileManageActivityBar)
    molecule.sidebar.add(devFileManageSideBar)
  }
}

export default DevFileManageExtension
