import './App.css'
import { useEffect, useState } from 'react'
import { useWindowSize } from './useWindowSize.tsx'
function UseEffectLearn() {
  useEffect(() => {
    document.title = 'React课程学习'
  })

  const [count, setCount] = useState(0)

  // useEffect必须加依赖项进行状态比较, 否则就会发生死循环
  useEffect(() => {
    setCount(count + 1)
  }, [])

  const [total, setTotal] = useState(0)

  // 当count发生变化的时候, 更新total的值
  useEffect(() => {
    setTotal(count * 5)
  }, [count])

  useEffect(() => {
    const t = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)

    // 页面关闭/跳转的时候清除定时器
    return () => {
      clearInterval(t)
    }
  }, [])

  const [size] = useWindowSize()

  return (
    <div>
      <p>
        Count: {count}, Total: {total}
      </p>
      <p>
        width: {size.width}, height: {size.height}
      </p>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <p>欢迎学习React</p>
      <UseEffectLearn></UseEffectLearn>
    </div>
  )
}

export default App
