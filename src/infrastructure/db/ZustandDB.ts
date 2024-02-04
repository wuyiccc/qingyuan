import { create } from 'zustand'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'

class ZustandDB {
  public static db = create<{
    token: string
    userEntity: UserEntity
    setUserEntity: (userEntity: UserEntity) => void
    setToken: (token: string) => void
  }>(set => ({
    token: StringUtils.EMPTY,
    userEntity: new UserEntity(),
    setUserEntity(userEntity: UserEntity) {
      set({
        userEntity
      })
    },
    setToken(token: string) {
      set({
        token
      })
    }
  }))
}

export default ZustandDB
