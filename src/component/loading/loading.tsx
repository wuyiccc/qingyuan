import { Spin } from 'antd'
import './loading.less'

export default function Loading({ tip = 'Loading' }: { tip?: string }) {
  return <Spin size='large' className='request-loading' tip={tip}></Spin>
}
