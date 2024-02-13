import { IExtension } from '@dtinsight/molecule/esm/model'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import * as folderTreeController from './FoldTreeController.ts'

export class TheFirstExtension implements IExtension {
  id: string = 'TheFirstExtension'
  name: string = 'The First Extension'

  activate(extensionCtx: IExtensionService): void {
    // console.log('activate')
    folderTreeController.initFolderTree()
    folderTreeController.handleSelectFolderTree()
    folderTreeController.handleStatusBarLanguage()
  }

  dispose(extensionCtx: IExtensionService): void {
    // console.log('dispose')
    throw new Error('Method not implemented.')
  }
}
