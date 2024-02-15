import React from 'react'
import '@dtinsight/molecule/esm/style/mo.css'
import { RouterProvider } from 'react-router-dom'
import './App.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import router from '@/router'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
