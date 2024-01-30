import axios, { AxiosError } from 'axios'
import { message } from 'antd'
import ServerBizCode from '@/infrastructure/constants/ServerBizCode.ts'
import { hideLoading, showLoading } from '@/infrastructure/util/loading'
import R from '@/infrastructure/pojo/R.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import HttpHeaderConstants from '@/infrastructure/constants/HttpHeaderConstants.ts'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  // 超时时间设置为8s
  timeout: 8000,
  timeoutErrorMessage: '请求超时, 请稍后再试'
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()

    const token = LocalDB.get(HttpHeaderConstants.TOKEN)
    if (token) {
      config.headers.token = token
    }

    return { ...config }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: R<any> = response.data

    hideLoading()

    const code: string = data.code

    if (code === ServerBizCode.ERROR_USER_NOT_LOGIN) {
      message.error(data.msg)
      LocalDB.remove(HttpHeaderConstants.TOKEN)
    } else if (code != ServerBizCode.OK) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params)
  }
}
