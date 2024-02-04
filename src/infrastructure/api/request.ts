import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import ServerBizCode from '@/infrastructure/constants/ServerBizCode.ts'
import { hideLoading, showLoading } from '@/component/loading'
import R from '@/infrastructure/pojo/R.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import HttpHeaderConstants from '@/infrastructure/constants/HttpHeaderConstants.ts'
import { message } from '@/component/message/AntdGlobal.tsx'
import { configs } from '@typescript-eslint/eslint-plugin'
import RedirectUtils from '@/infrastructure/util/common/RedirectUtils.ts'
import ZustandDB from '@/infrastructure/db/ZustandDB.ts'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  // 超时时间设置为8s
  timeout: 8000,
  timeoutErrorMessage: '请求超时, 请稍后再试'
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) {
      showLoading()
    }

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
      console.log('not login')
      message.error(data.msg)
      LocalDB.remove(HttpHeaderConstants.TOKEN)
      RedirectUtils.toLoginPage()
    } else if (code != ServerBizCode.OK) {
      if (response.config.showError === false) {
        return Promise.reject(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export default {
  get<T>(url: string, params?: object, options: IConfig = { showLoading: false, showError: true }): Promise<T> {
    return instance.get(url, { ...params, ...options })
  },
  post<T>(url: string, params?: object, options: IConfig = { showLoading: false, showError: true }): Promise<T> {
    return instance.post(url, params, options)
  }
}
