import { create } from 'zustand'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import { Collapse } from 'antd'

class StatusDB {
  public static db = create<{
    token: string
    userEntity: UserEntity
    setUserEntity: (userEntity: UserEntity) => void
    setToken: (token: string) => void
    collapsed: boolean
    reversedCollapsed: () => void
  }>(set => ({
    token: StringUtils.EMPTY,
    userEntity: new UserEntity(),
    collapsed: false,
    setUserEntity(userEntity: UserEntity) {
      set({
        userEntity
      })
    },
    setToken(token: string) {
      set({
        token
      })
    },
    reversedCollapsed() {
      set(state => {
        return {
          collapsed: !state.collapsed
        }
      })
    }
  }))
}

export default StatusDB
