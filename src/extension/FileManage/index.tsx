import { IExtension, IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import { cloneDeep } from 'lodash'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import TreeDTO from '@/infrastructure/pojo/dto/TreeDTO.ts'
import Api from '@/api'
import { transformToEditorTab } from '@/common'

class FileManageExtension implements IExtension {
  id: string = VegaEditorConstants.LEFT_BAR_FILE_MANAGE_ID
  name: string = VegaEditorConstants.LEFT_BAR_FILE_MANAGE_ID

  activate(extensionCtx: IExtensionService) {
    this.initUI()
  }

  dispose(extensionCtx: IExtensionService) {}

  async initUI() {
    const resList = await DevFileApi.getDevFileTree(StringUtils.EMPTY)

    const devFileTreeList = []
    // 转为tree结构
    const treeData = {
      children: [],
      data: '',
      id: 1,
      isLeaf: false,
      location: 'xxx',
      name: 'VegaDevFile',
      fileType: 'RootFolder'
    }

    console.log(treeData)
    const res = await Api.getFolderTree()

    const folderTreeData = cloneDeep(res.data)
    console.log(folderTreeData)
    const data = cloneDeep(treeData)
    // molecule.folderTree.add(data)

    // molecule.folderTree.onSelectFile((file: IFolderTreeNodeProps) => {
    //   molecule.editor.open(transformToEditorTab(file))
    // })
  }
}

export default FileManageExtension
