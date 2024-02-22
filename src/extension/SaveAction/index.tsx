import { IExtension } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import { EDITOR_ACTION_SAVE } from '@/extension/SaveAction/base.tsx'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import CurrentEditorDataDTO from '@/infrastructure/pojo/dto/CurrentEditorDataDTO.ts'
import EditorDataTypeEnum from '@/infrastructure/pojo/enumeration/EditorDataTypeEnum.ts'
import ConsoleOutputUtils from '@/infrastructure/util/common/ConsoleOutputUtils.ts'

export class SaveActionExtension implements IExtension {
  id: string = VegaEditorConstants.EDITOR_ACTION_SAVE_ID
  name: string = VegaEditorConstants.EDITOR_ACTION_SAVE_ID

  private timer: any

  activate(extensionCtx: IExtensionService) {
    this.initUI()
    this.onClickAction()
  }

  dispose(extensionCtx: IExtensionService) {
    clearTimeout(this.timer)
  }

  initUI() {
    this.timer = setTimeout(() => {
      const builtInEditorInitialActions = molecule.builtin.getModule('builtInEditorInitialActions')
      molecule.editor.setDefaultActions([{ ...EDITOR_ACTION_SAVE }, ...builtInEditorInitialActions.value])
    })
  }

  onClickAction() {
    molecule.editor.onActionsClick(async editorActionId => {
      switch (editorActionId) {
        case EDITOR_ACTION_SAVE.id: {
          molecule.editor.updateActions([
            {
              id: EDITOR_ACTION_SAVE.id,
              icon: 'loading~spin',
              disabled: true
            }
          ])
          const data: CurrentEditorDataDTO = LocalDB.get(LocalDBConstants.CURRENT_EDIT_FILE_DATA)

          try {
            if (data.editorDataType === EditorDataTypeEnum.USER) {
              await UserApi.updateUser(JSON.parse(data.jsonData))

              ConsoleOutputUtils.printInfoMessage('更新用户信息成功')
            }
          } catch (error) {
            console.log(error)
          }
          this.timer = setTimeout(() => {
            molecule.editor.updateActions([
              {
                ...EDITOR_ACTION_SAVE,
                disabled: false
              }
            ])
          }, 600)
          break
        }
      }
    })
  }
}
