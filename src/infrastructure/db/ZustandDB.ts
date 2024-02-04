import { create } from 'zustand'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'

class ZustandDB {
  public static useBearStore = create<{
    token: string
    userEntity: UserEntity
    updateUserEntity: (userEntity: UserEntity) => void
  }>(set => ({
    token: StringUtils.EMPTY,
    userEntity: new UserEntity(),
    updateUserEntity(userEntity: UserEntity) {
      set({
        userEntity
      })
    }
  }))
}

export default ZustandDB
