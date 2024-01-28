import { Spin } from 'antd'
import './loading.less'
export default function Loading() {
  return <Spin size='large' className='request-loading'></Spin>
}
