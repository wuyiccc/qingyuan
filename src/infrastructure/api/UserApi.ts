import request from '@/infrastructure/api/request.ts'
import UserLoginBO from '@/infrastructure/pojo/bo/UserLoginBO.ts'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import UserCreateBO from '@/infrastructure/pojo/bo/UserCreateBO.ts'
import UserUpdateBO from '@/infrastructure/pojo/bo/UserUpdateBO.ts'

class UserApi {
  public static PREFIX_URL: string = '/user'

  public static async login(params: UserLoginBO): Promise<string> {
    return await request.post(UserApi.PREFIX_URL + '/login', params, null)
  }

  public static async getCurrentUserInfo(): Promise<UserEntity> {
    return await request.get(UserApi.PREFIX_URL + '/getCurrentUserInfo', null, null)
  }

  public static async addUser(userCreateBO: UserCreateBO): Promise<string> {
    return await request.post(UserApi.PREFIX_URL + '/addUser', userCreateBO, null)
  }

  public static async updateUser(userUpdateBO: UserUpdateBO): Promise<string> {
    return await request.post(UserApi.PREFIX_URL + '/updateUser', userUpdateBO, null)
  }

  public static async removeUser(id: string): Promise<string> {
    return await request.post(UserApi.PREFIX_URL + '/removeUser?id=' + id, null, null)
  }

  public static async removeUserList(idList: string[]): Promise<string> {
    return await request.post(UserApi.PREFIX_URL + '/removeUserList?idList=' + idList, null, null)
  }

  public static async getUserById(id: string): Promise<UserEntity> {
    return await request.get(UserApi.PREFIX_URL + '/getUserById?id=' + id, null, null)
  }
}

export default UserApi
