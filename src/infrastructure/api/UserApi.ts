import request from '@/infrastructure/util/request.ts'
import UserLoginBO from '@/infrastructure/pojo/bo/UserLoginBO.ts'

class UserApi {
  public static async login(params: UserLoginBO): Promise<string> {
    return await request.post('/user/login', params)
  }
}

export default UserApi
