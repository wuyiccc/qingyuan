import './App.css'
import { useRef, useState } from 'react'

function UserRefLearn() {
  const userRef = useRef<HTMLInputElement>(null)
  const [val, setVal] = useState('')

  function handleClick() {
    // userRef.current?.focus()
    setVal(userRef.current?.value || '')
    console.log(userRef.current?.className)
  }

  return (
    <div>
      <input type='text' ref={userRef} className='red' id='user' />
      <button onClick={handleClick}>按钮</button>
      <p>{val}</p>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <p>欢迎学习React</p>
      <UserRefLearn></UserRefLearn>
    </div>
  )
}

export default App
