import PageParam from '@/infrastructure/pojo/PageParam.ts'

class UserManagePageQueryBO extends PageParam {
  public userId: string

  public username: string

  public nickname: string
}

export default UserManagePageQueryBO
