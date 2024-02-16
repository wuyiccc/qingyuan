import { IExtension } from '@dtinsight/molecule/esm/model'
import VegaTheme from '@/extension/VegaTheme'
import InitializeExtension from '@/extension/Initialize'
import { UserLoginInfoExtension } from '@/extension/UserLoginInfo'

const extensions: IExtension[] = [
  VegaTheme,
  new InitializeExtension(),
  // new DataSourceExtension(),
  new UserLoginInfoExtension()
]

export default extensions
