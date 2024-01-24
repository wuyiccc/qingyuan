import './App.css'
import { useState, useTransition } from 'react'

function UseTransitionLearn() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState<any>([])
  const [isPendding, startTransition] = useTransition()

  const handleChange = (e: any) => {
    // setQuery会同步执行
    setQuery(e.target.value)

    // transition包裹的代码会异步执行
    startTransition(() => {
      const arr = Array.from({ length: 5000 }).fill(1)
      setList([...list, ...arr])
    })
  }

  return (
    <div>
      <input type='text' onChange={handleChange} value={query}></input>

      <div>
        {isPendding ? (
          <div> Loading... </div>
        ) : (
          list.map((item: number, index: number) => {
            return <p key={index}>{query}</p>
          })
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <p>欢迎学习React</p>
      <UseTransitionLearn></UseTransitionLearn>
    </div>
  )
}

export default App
