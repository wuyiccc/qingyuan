import { IActivityBarItem } from '@dtinsight/molecule/esm/model'
import LeftBarConstants from '@/infrastructure/constants/LeftBarConstants.ts'
import UserManageLogo from '@/extension/UserManage/component/UserManageLogo'

const userManageActivityBar: IActivityBarItem = {
  id: LeftBarConstants.LEFT_BAR_USER_MANAGE,
  sortIndex: 1,
  name: LeftBarConstants.LEFT_BAR_USER_MANAGE,
  title: LeftBarConstants.LEFT_BAR_USER_MANAGE,
  type: 'normal',
  render: () => <UserManageLogo />
}

export default userManageActivityBar
