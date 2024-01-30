import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/view/login/Login.tsx'
import Welcome from '@/view/Welcome.tsx'
import Error404 from '@/view/404.tsx'
import Error403 from '@/view/403.tsx'

const router = [
  {
    path: '/',
    element: <Welcome></Welcome>,
    id: 'home'
  },
  {
    path: '/login',
    element: <Login />,
    id: 'login'
  },
  {
    path: '*',
    element: <Navigate to='/404'></Navigate>,
    id: 'others'
  },
  {
    path: '/404',
    element: <Error404 />,
    id: '404'
  },
  {
    path: '/403',
    element: <Error403 />,
    id: '403'
  }
]

export default createBrowserRouter(router)
