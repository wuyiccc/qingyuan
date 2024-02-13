import { IExtension } from '@dtinsight/molecule/esm/model'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import { DATA_SOURCE_ID, dataSourceActivityBar, dataSourceSideBar } from '@/extension/DataSource/base.tsx'

export class DataSourceExtension implements IExtension {
  id: string = DATA_SOURCE_ID

  name: string = 'Data Source'

  activate(extensionCtx: IExtensionService): void {
    console.log('data Source')
    this.initUI()
  }

  dispose(extensionCtx: IExtensionService): void {
    molecule.sidebar.remove(dataSourceSideBar.id)
    molecule.activityBar.remove(dataSourceActivityBar.id)
    setTimeout(() => {
      // TODO: upgrade the Molecule and remove it.
      // molecule.menuBar.append(createDataSourceMenuItem, 'File')
    })
  }
  initUI() {
    molecule.sidebar.add(dataSourceSideBar)
    molecule.activityBar.add(dataSourceActivityBar)
  }
}
