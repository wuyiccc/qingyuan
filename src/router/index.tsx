import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/view/Login/Login.tsx'
import Error404 from '@/view/404.tsx'
import Error403 from '@/view/403.tsx'
import React from 'react'
import { create, Workbench } from '@dtinsight/molecule'
import extensions from '@/extension'
import AuthLoader from '@/router/AuthLoader.ts'

const moInstance = create({
  extensions
})

const DefaultWorkbench = () => moInstance.render(<Workbench />)

const router = [
  {
    id: 'workbench',
    path: '/',
    element: <DefaultWorkbench />,
    loader: AuthLoader
  },
  {
    id: 'login',
    path: '/login',
    element: <Login />
  },
  {
    id: 'others',
    path: '*',
    element: <Navigate to='/404'></Navigate>
  },
  {
    id: '404',
    path: '/404',
    element: <Error404 />
  },
  {
    id: '403',
    path: '/403',
    element: <Error403 />
  }
]

export default createBrowserRouter(router)
