import { createBrowserRouter, useParams } from 'react-router-dom'
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

function Order() {
  const params = useParams()
  return (
    <div>
      <h2>Order: {params.id}</h2>
    </div>
  )
}

function Goods() {
  const params = useParams()
  return (
    <div>
      <h2>Goods Info</h2>
      <p>{params.goodsId}</p>
      <p>{params.orderId}</p>
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
    path: '/order/:id',
    element: <Order />
  },
  {
    path: '/goods/:goodsId/order/:orderId',
    element: <Goods />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
