import { useEffect } from 'react'
import request from '@/util/request.ts'

export default function Login() {
  useEffect(() => {
    request
      .get('/users', {
        id: 12345
      })
      .catch(res => {
        console.log('res ', res)
      })
      .catch(error => {
        console.log('error ', error)
      })
  })

  return <div className='welcome'>Login</div>
}
