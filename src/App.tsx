import './App.css'
import React, { useContext } from 'react'

const UserContext = React.createContext({ name: '' })
function UserContextLearn() {
  return (
    <UserContext.Provider value={{ name: 'tom' }}>
      <div>
        <Child1></Child1>
      </div>
    </UserContext.Provider>
  )
}

function Child1() {
  return (
    <div>
      <p>
        <span>Child1</span>
      </p>
      <Child2></Child2>
    </div>
  )
}

function Child2() {
  const { name } = useContext(UserContext)

  return (
    <div>
      <p>Child2: {name}</p>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <p>欢迎学习React</p>
      <UserContextLearn></UserContextLearn>
    </div>
  )
}

export default App
