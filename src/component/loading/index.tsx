import './loading.less'

let requestCount = 0

export const showLoading = () => {
  // 如果是第一个请求, 则显示loading组件
  requestCount++
  if (requestCount === 1) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'flex')
  }
}

export const hideLoading = () => {
  if (requestCount <= 0) {
    return
  }

  requestCount--

  // 最后一个请求结束之后才关闭loading
  if (requestCount === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'none')
  }
}
