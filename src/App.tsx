import './App.css'

function App() {
  const style = { color: 'red' }

  const name = <span style={style}>你好</span>
  // const h1 = <h1> 欢迎学习react后台开发 </h1>

  const p = <p>欢迎学习React通用后台开发</p>

  const isAdmin = false
  return (
    <div className='App'>
      <p> {name} </p>
      {p}

      {isAdmin ? <span>您好: 管理员</span> : <span>普通访客</span>}

      <p>{isAdmin ? '您好: 管理员' : <span>普通访客</span>}</p>
    </div>
  )
}

export default App
