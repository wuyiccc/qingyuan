import { IExtension } from '@dtinsight/molecule/esm/model'
import VegaTheme from '@/extension/VegaTheme'
import InitializeExtension from '@/extension/Initialize'
import { UserLoginInfoExtension } from '@/extension/UserLoginInfo'
import UserManageExtension from '@/extension/UserManage'
import { SaveActionExtension } from '@/extension/SaveAction'

const extensions: IExtension[] = [
  VegaTheme,
  new InitializeExtension(),
  new UserLoginInfoExtension(),
  new UserManageExtension(),
  new SaveActionExtension()
]

export default extensions
