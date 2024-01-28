import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/view/Login'
import Welcome from '@/view/Welcome.tsx'
import Error404 from '@/view/404.tsx'
import Error403 from '@/view/403.tsx'

const router = [
  {
    path: '/',
    element: <Welcome></Welcome>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to='/404'></Navigate>
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

export default createBrowserRouter(router)
