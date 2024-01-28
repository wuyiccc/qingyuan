import axios, { AxiosError } from 'axios'
import { message } from 'antd'
import ServerBizCode from '@/config/constants/ServerBizCode.ts'

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
instance.interceptors.response.use(response => {
  const data = response.data
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
})

export default {
  get(url: string, params: any) {
    return instance.get(url, { params })
  },
  post(url: string, params: any) {
    return instance.post(url, params)
  }
}
