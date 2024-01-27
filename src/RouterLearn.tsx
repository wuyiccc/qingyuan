import { createBrowserRouter, Outlet, useParams } from 'react-router-dom'
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

function NestedRouter() {
  return (
    <div>
      <h1>商品主页</h1>
      <Outlet />
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
    path: 'nested',
    element: <NestedRouter />,
    children: [
      {
        path: 'cart1',
        element: <div>cart1</div>
      },
      {
        path: 'cart2',
        element: <div>cart2</div>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
