import UserAddBO from '@/infrastructure/pojo/bo/UserAddBO.ts'
import { MutableRefObject } from 'react'

class CreateUserModalDTO<T extends UserAddBO> {
  // 内部定义open对象函数
  mRef: MutableRefObject<{ open: (data?: T) => void }>
  // 回调函数
  callback: () => void
}

export default CreateUserModalDTO
