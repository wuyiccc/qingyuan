import UserCreateBO from '@/infrastructure/pojo/bo/UserCreateBO.ts'
import { MutableRefObject } from 'react'

class CreateUserModalDTO<T extends UserCreateBO> {
  // 内部定义open对象函数
  mRef: MutableRefObject<{ open: (data?: T) => void }>
  // 回调函数
  callback: () => void
}

export default CreateUserModalDTO
