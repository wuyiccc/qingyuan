import './App.less'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider } from 'antd'
import { App as AntdApp } from 'antd'
import AntdGlobal from '@/component/message/AntdGlobal.tsx'
import zhCN from 'antd/es/locale/zh_CN'

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#282A36' } }}>
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
