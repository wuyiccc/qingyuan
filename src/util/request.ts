import axios, { AxiosError } from 'axios'
import { message } from 'antd'
import ServerBizCode from '@/config/constants/ServerBizCode.ts'
import { hideLoading, showLoading } from '@/util/loading'

const instance = axios.create({
  baseURL: '/api',
  // 超时时间设置为8s
  timeout: 8000,
  timeoutErrorMessage: '请求超时, 请稍后再试',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()

    const token = localStorage.getItem('token')
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
    const data = response.data

    hideLoading()

    const code: string = data.code

    if (code === ServerBizCode.ERROR_USER_NOT_LOGIN) {
      message.error(data.msg)
      localStorage.removeItem('token')
      // localStorage.href = '/login'
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
