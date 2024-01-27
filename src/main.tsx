import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom'

function ReactDemo() {
  return (
    <div>
      <h2>
        React <Link to='..'>Back</Link>
      </h2>
    </div>
  )
}

function ViteDemo() {
  return <h2>Vite</h2>
}

function Test() {
  return (
    <div>
      <h2> welcome learn react, this is test {<Navigate to='/react' />}</h2>
    </div>
  )
}

function NotFound() {
  return (
    <div>
      <h2>current page 404</h2>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/react' element={<ReactDemo />}></Route>
      <Route path='/vite' element={<ViteDemo />}></Route>
      <Route path='/test' element={<Test />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  </HashRouter>
)
