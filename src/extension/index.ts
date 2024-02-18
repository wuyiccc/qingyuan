import { IExtension } from '@dtinsight/molecule/esm/model'
import VegaTheme from '@/extension/VegaTheme'
import InitializeExtension from '@/extension/Initialize'
import { UserLoginInfoExtension } from '@/extension/UserLoginInfo'
import UserManageExtension from '@/extension/UserManage'

const extensions: IExtension[] = [
  VegaTheme,
  new InitializeExtension(),
  new UserLoginInfoExtension(),
  new UserManageExtension()
]

export default extensions
