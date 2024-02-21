import { IActivityBarItem } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import UserLoginInfo from '@/extension/UserLoginInfo/component'

export const UserLoginInfoActivityBar: IActivityBarItem = {
  id: VegaEditorConstants.LEFT_BAR_USER_LOGIN_INFO_ID,
  sortIndex: 0,
  name: VegaEditorConstants.LEFT_BAR_USER_LOGIN_INFO_ID,
  title: VegaEditorConstants.LEFT_BAR_USER_LOGIN_INFO_ID,
  type: 'global',
  render: () => <UserLoginInfo />
}
