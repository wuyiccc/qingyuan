import resso from 'resso'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'

class RessoDB {
  public static store = resso({
    token: '',
    userEntity: new UserEntity(),
    updateUserEntity(userEntity: UserEntity) {
      RessoDB.store.userEntity = userEntity
    }
  })
}

export default RessoDB
