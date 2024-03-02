import { IEditorActionsProps } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'

export const EDITOR_ACTION_SAVE: IEditorActionsProps = {
  id: VegaEditorConstants.EDITOR_ACTION_SAVE_ID,
  name: 'Save',
  icon: 'save',
  place: 'outer',
  disabled: false,
  title: '保存'
}
