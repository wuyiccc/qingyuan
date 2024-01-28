import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  // 超时时间设置为8s
  timeout: 8000,
  timeoutErrorMessage: '请求超时, 请稍后再试',
  withCredentials: true
})

export default {
  get(url: string, params: any) {
    return instance.get(url, { params })
  },
  post(url: string, params: any) {
    return instance.post(url, params)
  }
}
