import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/view/login/Login.tsx'
import Welcome from '@/view/Welcome.tsx'
import Error404 from '@/view/404.tsx'
import Error403 from '@/view/403.tsx'
import Layout from '@/layout'

const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />,
    id: 'home'
  },
  {
    path: '/login',
    element: <Login />,
    id: 'login'
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      }
    ]
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
