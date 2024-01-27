import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'

function ViteDemo() {
  return (
    <div>
      <h2>vite demo</h2>
    </div>
  )
}

function ReactDemo() {
  return (
    <div>
      <h2>react demo</h2>
    </div>
  )
}

function NotFound() {
  return (
    <div>
      <h2>Not found</h2>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/vite',
    element: <ViteDemo />
  },
  {
    path: '/react',
    element: <ReactDemo />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
