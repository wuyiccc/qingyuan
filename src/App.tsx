import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#282A36' } }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
