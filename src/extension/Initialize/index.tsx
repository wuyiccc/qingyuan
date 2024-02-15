import { IExtension } from '@dtinsight/molecule/esm/model'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import ThemeConstants from '@/infrastructure/constants/ThemeConstants.ts'
import WorkbenchEntry from '@/component/WorkbenchEntry'

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
}

export default InitializeExtension
