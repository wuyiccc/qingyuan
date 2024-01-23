import './App.css'
import { memo, useCallback, useContext, useMemo, useState } from 'react'

function UseMemoLearn() {
  const [count, setCount] = useState(0)

  function handleSetCount() {
    setCount(count => count + 1)
  }

  // when page refreshed the total1's function will execute again
  const total1 = () => {
    console.log('total1 execute')
    const list = [1, 2, 3, 4, 5]
    return list.reduce((pre, cur) => pre + cur)
  }

  // useMemo has memory function, if page refreshed, and dependency has not changed, the total2's function cannot execute again
  const total2 = useMemo(() => {
    console.log('total2 execute')
    const list = [1, 2, 3, 4, 5]
    return list.reduce((pre, cur) => pre + cur)
  }, [])

  // use useCallback to persistence function, if dependency does not change, the function object does not recreate
  const handleChildClick = useCallback(() => {
    console.log('child node click')
  }, [])

  // memo use to persistence node, if callback not changed, this node does not rebuild
  const Child = memo(({ callback }: any) => {
    console.log('build Child node')
    return (
      <div>
        <button onClick={callback}>child node</button>
      </div>
    )
  })

  return (
    <div>
      <p>total1: {total1()}</p>
      <p>total2: {total2}</p>
      <p>{count}</p>
      <button onClick={handleSetCount}>add count</button>
      <Child callback={handleChildClick}></Child>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <p>欢迎学习React</p>
      <UseMemoLearn></UseMemoLearn>
    </div>
  )
}

export default App
