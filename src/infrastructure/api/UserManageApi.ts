import request from '@/infrastructure/api/request.ts'
import UserManagePageQueryBO from '@/infrastructure/pojo/bo/UserManagePageQueryBO.ts'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import PageEntity from '@/infrastructure/pojo/entity/PageEntity.ts'

class UserManageApi {
  public static PREFIX_URL: string = '/userManage'

  public static async getUserIdList(): Promise<string[]> {
    return await request.get(UserManageApi.PREFIX_URL + '/getUserIdList', null, null)
  }

  public static async pageQueryUser(param: UserManagePageQueryBO): Promise<PageEntity<UserEntity>> {
    return await request.post(UserManageApi.PREFIX_URL + '/pageQueryUser', param, { showLoading: true })
  }

  public static async getUserList(): Promise<UserEntity[]> {
    return await request.get(UserManageApi.PREFIX_URL + '/getUserList', null, null)
  }
}

export default UserManageApi
