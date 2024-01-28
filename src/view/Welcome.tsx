import request from '@/util/request.ts'
import { Button } from 'antd'

function handleClick() {
  request.post('/user/login', {
    username: 'admin',
    password: '1234'
  })
}

export default function Welcome() {
  return (
    <div className='welcome'>
      <p>Welcome</p>
      <p>
        <Button onClick={handleClick}>点击事件</Button>
      </p>
    </div>
  )
}
