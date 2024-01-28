import ReactDOM from 'react-dom/client'
import Loading from '@/util/loading/loading.tsx'

let count = 0

export const showLoading = () => {
  if (count === 0) {
    console.log('add loading')
    const loading = document.createElement('div')
    loading.setAttribute('id', 'loading')
    document.body.appendChild(loading)
    ReactDOM.createRoot(loading).render(<Loading />)
  }
  count++
}

export const hideLoading = () => {
  if (count < 0) {
    return
  }
  count--

  // 最后一个请求结束之后才关闭loading
  if (count === 0) {
    document.body.removeChild(document.getElementById('loading') as HTMLDivElement)
  }
}
