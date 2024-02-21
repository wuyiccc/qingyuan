import { IExtension } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import { UserLoginInfoActivityBar } from '@/extension/UserLoginInfo/base.tsx'

export class UserLoginInfoExtension implements IExtension {
  id: string = VegaEditorConstants.LEFT_BAR_USER_LOGIN_INFO_ID
  name: string = VegaEditorConstants.LEFT_BAR_USER_LOGIN_INFO_ID

  activate(extensionCtx: IExtensionService) {
    molecule.activityBar.add(UserLoginInfoActivityBar)
  }

  dispose(extensionCtx: IExtensionService) {
    molecule.activityBar.remove(UserLoginInfoActivityBar.id)
  }
}
