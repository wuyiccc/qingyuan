import { IExtension } from '@dtinsight/molecule/esm/model'
import LeftBarConstants from '@/infrastructure/constants/LeftBarConstants.ts'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import molecule from '@dtinsight/molecule'
import { UserLoginInfoActivityBar } from '@/extension/UserLoginInfo/base.tsx'

export class UserLoginInfoExtension implements IExtension {
  id: string = LeftBarConstants.LEFT_BAR_USER_LOGIN_INFO
  name: string = LeftBarConstants.LEFT_BAR_USER_LOGIN_INFO

  activate(extensionCtx: IExtensionService) {
    molecule.activityBar.add(UserLoginInfoActivityBar)
  }

  dispose(extensionCtx: IExtensionService) {
    molecule.activityBar.remove(UserLoginInfoActivityBar.id)
  }
}
