import { useEffect } from 'react'
import request from '@/util/request.ts'

export default function Login() {
  useEffect(() => {
    request.post('/user/login', {
      username: 'admin',
      password: '123'
    })
  }, [])

  return <div className='welcome'>Login</div>
}
