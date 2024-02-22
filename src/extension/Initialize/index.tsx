import { IExtension, IMenuBarItem, IStatusBarItem } from '@dtinsight/molecule/esm/model'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import WorkbenchEntry from '@/extension/Initialize/component/WorkbenchEntry'
import React from 'react'
import { constants } from '@dtinsight/molecule/esm/services/builtinService/const'
import Logo from '@/extension/Initialize/component/Logo'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'

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
    this.initializeMenuBar()
  }

  dispose(): void {
    throw new Error('Method not implemented.')
  }

  initializeTheme() {
    // 默认设置vega主题色
    molecule.colorTheme.setTheme(VegaEditorConstants.THEME_VEGA_ID)
  }

  initializeEntryPage() {
    molecule.editor.setEntry(<WorkbenchEntry />)
  }

  async initializeStatusBar() {
    molecule.statusBar.remove(constants.STATUS_PROBLEMS)
    molecule.statusBar.remove(constants.NOTIFICATION_MODEL_ID)
    molecule.statusBar.remove(VegaEditorConstants.STATUS_BAR_SYSTEM_DEFAULT_EDITOR_INFO_ID)

    const userEntity = LocalDB.get(LocalDBConstants.CURRENT_LOGIN_USER_ENTITY_KEY)

    molecule.statusBar.add(
      {
        sortIndex: 0,
        id: VegaEditorConstants.STATUS_BAR_USER_NAME_ID,
        name: userEntity.nickname,
        onClick: () => {
          console.log('yes')
        }
      },
      molecule.model.Float.left
    )
  }

  initializeMenuBar() {
    molecule.menuBar.setState({
      logo: <Logo />
    })

    molecule.layout.setMenuBarMode('horizontal')

    const vegaMenu: IMenuBarItem = {
      id: VegaEditorConstants.MENU_BAR_VEGA_GITHUB_ID,
      name: VegaEditorConstants.MENU_BAR_VEGA_GITHUB_NAME
    }

    const wuyicccMenu: IMenuBarItem = {
      id: VegaEditorConstants.MENU_BAR_WUYICCC_SITE_ID,
      name: VegaEditorConstants.MENU_BAR_WUYICCC_SITE_NAME
    }

    const state = molecule.menuBar.getState()
    const nextData = state.data.concat()
    nextData.splice(nextData.length - 1, 0, vegaMenu)
    nextData.splice(nextData.length - 1, 0, wuyicccMenu)
    console.log(nextData)
    let deleteIndex = nextData.findIndex(menu => menu.id === 'Run')
    if (deleteIndex > -1) {
      nextData.splice(deleteIndex, 1)
    }
    deleteIndex = nextData.findIndex(menu => menu.id === 'File')
    if (deleteIndex > -1) {
      nextData.splice(deleteIndex, 1)
    }
    deleteIndex = nextData.findIndex(menu => menu.id === 'Help')
    if (deleteIndex > -1) {
      nextData.splice(deleteIndex, 1)
    }
    deleteIndex = nextData.findIndex(menu => menu.id === 'Edit')
    if (deleteIndex > -1) {
      nextData.splice(deleteIndex, 1)
    }
    deleteIndex = nextData.findIndex(menu => menu.id === 'Selection')
    if (deleteIndex > -1) {
      nextData.splice(deleteIndex, 1)
    }
    // 不能删除view菜单, 否则关闭sidebar面板的时候会报错
    // deleteIndex = nextData.findIndex(menu => menu.id === 'View')
    // if (deleteIndex > -1) {
    //   nextData.splice(deleteIndex, 1)
    // }

    molecule.menuBar.setState({
      data: nextData
    })

    molecule.menuBar.onSelect(menuId => {
      if (menuId === VegaEditorConstants.MENU_BAR_VEGA_GITHUB_ID) {
        window.open('https://github.com/tianxuan-platform/vega-web')
      } else if (menuId === VegaEditorConstants.MENU_BAR_WUYICCC_SITE_ID) {
        window.open('http://www.wuyiccc.com/')
      }
    })
  }
}

export default InitializeExtension
