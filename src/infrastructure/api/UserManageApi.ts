import request from '@/infrastructure/api/request.ts'

class UserManageApi {
  public static PREFIX_URL: string = '/userManage'

  public static async getUserIdList(): Promise<string[]> {
    return await request.get(UserManageApi.PREFIX_URL + '/getUserIdList', null, null)
  }
}

export default UserManageApi
