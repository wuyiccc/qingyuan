import ServerBizCode from '@/infrastructure/constants/ServerBizCode.ts'

class R<T> {
  code?: string

  msg?: string

  data?: T
}

export default R
