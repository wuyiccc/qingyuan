import { IActivityBarItem } from '@dtinsight/molecule/esm/model'
import LeftBarConstants from '@/infrastructure/constants/LeftBarConstants.ts'
import UserLoginInfo from '@/component/UserLoginInfo'

export const UserLoginInfoActivityBar: IActivityBarItem = {
  id: LeftBarConstants.LEFT_BAR_USER_LOGIN_INFO,
  sortIndex: 0,
  name: LeftBarConstants.LEFT_BAR_USER_LOGIN_INFO,
  title: LeftBarConstants.LEFT_BAR_USER_LOGIN_INFO,
  type: 'global',
  render: () => <UserLoginInfo />
}
