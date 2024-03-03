import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'

export default class EditorTabUtils {
  public static getDevFileManageEditorTabId(editorTabId?: string): string {
    if (StringUtils.isEmpty(editorTabId)) {
      return StringUtils.EMPTY
    }

    const flag = editorTabId.startsWith(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_EDIT_ID_PREFIX)
    const prefix = VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_EDIT_ID_PREFIX
    if (flag) {
      return editorTabId.substring(prefix.length)
    } else {
      return StringUtils.EMPTY
    }
  }
}
