import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavLink, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/react')
  }

  return (
    <>
      <div>
        <NavLink to='/vite'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </NavLink>
        <NavLink to='/react'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </NavLink>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => handleClick()}>click to jump</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
