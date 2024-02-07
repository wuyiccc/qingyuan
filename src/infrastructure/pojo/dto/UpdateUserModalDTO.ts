import { MutableRefObject } from 'react'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'

class UpdateUserModalDTO {
  mRef: MutableRefObject<{ open: (data: UserEntity) => void } | undefined>

  callback: () => void
}

export default UpdateUserModalDTO
