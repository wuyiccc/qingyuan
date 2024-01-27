import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { HashRouter, Link, Route, Routes } from 'react-router-dom'

function ReactDemo() {
  return (
    <div>
      <h2>
        // back to page React <Link to='..'>Back</Link>
      </h2>
    </div>
  )
}

function ViteDemo() {
  return <h2>Vite</h2>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/react' element={<ReactDemo />}></Route>
      <Route path='/vite' element={<ViteDemo />}></Route>
    </Routes>
  </HashRouter>
)
