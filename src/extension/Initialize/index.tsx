import { IExtension, IStatusBarItem } from '@dtinsight/molecule/esm/model'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import ThemeConstants from '@/infrastructure/constants/ThemeConstants.ts'
import WorkbenchEntry from '@/component/WorkbenchEntry'
import React from 'react'
import { constants } from '@dtinsight/molecule/esm/services/builtinService/const'
import StatusBarConstants from '@/infrastructure/constants/StatusBarConstants.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'

/**
 * 初始化工作台
 */
class InitializeExtension implements IExtension {
  id: string = 'initialize'
  name: string = 'initialize'

  activate(extensionCtx: IExtensionService): void {
    // 1. 初始化主题
    this.initializeTheme()
    // 2. 初始化入口页
    this.initializeEntryPage()

    // 3. 初始化底部栏目
    this.initializeStatusBar()
    // 4. 初始化顶部菜单
    // 5. 初始化用户信息
  }

  dispose(): void {
    throw new Error('Method not implemented.')
  }

  initializeTheme() {
    // 默认设置vega主题色
    molecule.colorTheme.setTheme(ThemeConstants.VEGA_THEME_ID)
  }

  initializeEntryPage() {
    molecule.editor.setEntry(<WorkbenchEntry />)
  }

  async initializeStatusBar() {
    molecule.statusBar.remove(constants.STATUS_PROBLEMS)
    molecule.statusBar.remove(constants.NOTIFICATION_MODEL_ID)
    molecule.statusBar.remove(StatusBarConstants.STATUS_BAR_STATUS_EDITOR_INFO_ID)

    const userEntity = await UserApi.getCurrentUserInfo()

    molecule.statusBar.add(
      {
        sortIndex: 0,
        id: StatusBarConstants.STATUS_BAR_STATUS_EDITOR_INFO_ID,
        name: userEntity.nickname,
        onClick: () => {
          console.log('yes')
        }
      },
      molecule.model.Float.left
    )
  }
}

export default InitializeExtension
