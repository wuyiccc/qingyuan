import './App.css'
import { useState } from 'react'
import { flushSync } from 'react-dom'

function UseStateLearn() {
  const [name, setName] = useState('wuyiccc')

  function handleUpdate() {
    setName('new name')
  }

  const [user, setUser] = useState({ name: 'wuyiccc', age: 25 })

  const [list, setList] = useState(['Tom', 'Jack'])

  function hanldeUpdateUser() {
    setUser({ name: user.name, age: 26 })
  }

  function handleUpdateList() {
    // list.push('wuyiccc')
    // 元素地址必须要发生变化才会触发更新
    setList([...list, 'wuyiccc'])
  }

  console.log('render')

  const [count, setCount] = useState(0)

  function handleCount() {
    setTimeout(() => {
      // setCount(count => count + 1)
      // setCount(count => count + 1)
      // setCount(count => count + 1)
      // setCount(count => count + 1)
    })
    // 该函数是强制刷新, 会强制打印1次render, 不会与外部setCount合并
    flushSync(() => {
      setCount(count => count + 1)
      setCount(count => count + 1)
    })
  }

  return (
    <div>
      <p>{name}</p>
      <p>
        <button onClick={handleUpdate}>修改名称</button>
      </p>
      <p>
        用户名称: {user.name}, 用户年龄: {user.age}
      </p>
      <p>
        <button onClick={hanldeUpdateUser}>修改用户信息</button>
      </p>

      <ul>
        {list.map(e => {
          return <li key={e}>{e}</li>
        })}
      </ul>
      <p>
        <button onClick={handleUpdateList}>修改列表</button>
      </p>
      <p>{count}</p>
      <p>
        <button onClick={handleCount}>计数</button>
      </p>
    </div>
  )
}

function App() {
  return (
    <div>
      <UseStateLearn></UseStateLearn>
    </div>
  )
}

export default App
