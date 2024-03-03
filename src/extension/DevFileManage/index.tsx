import { IExtension } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import { devFileManageActivityBar, devFileManageSideBar } from '@/extension/DevFileManage/base.tsx'
import styles from './index.module.less'
import DevFileManageVersionManageRightBar from '@/extension/DevFileManage/component/DevFileManageVersionManageRightBar'

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

    molecule.auxiliaryBar.setMode('tabs')
    molecule.auxiliaryBar.addAuxiliaryBar([
      {
        key: VegaEditorConstants.RIGHT_BAR_DEV_FILE_VERSION_MANAGE,
        title: <div className={styles.rightBar}>版本管理</div>
      }
    ])

    molecule.auxiliaryBar.onTabClick(() => {
      console.log('点击tab')
      const tab = molecule.auxiliaryBar.getCurrentTab()
      if (tab) {
        molecule.auxiliaryBar.setChildren(<DevFileManageVersionManageRightBar />)
      }

      molecule.layout.setAuxiliaryBar(!tab)
    })
  }
}

export default DevFileManageExtension
