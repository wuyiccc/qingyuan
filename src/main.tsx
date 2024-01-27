import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { HashRouter, Route, Routes } from 'react-router-dom'

function ReactDemo() {
  return <h2>欢迎学习React课程</h2>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Routes>
      <Route path='/react' element={<App />}></Route>
      <Route path='/demo' element={<ReactDemo />}></Route>
    </Routes>
  </HashRouter>
)
