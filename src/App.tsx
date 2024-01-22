import './App.css'

function MyButton() {
  return <button>I'm a button</button>
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there. <br /> How do you do ?
      </p>
    </>
  )
}

function App() {
  return (
    <div>
      <h1>welcome to my app</h1>
      <MyButton></MyButton>
      <AboutPage></AboutPage>

      <img src='http://wuyiccc.com/imgs/avatar2.jpg' className='avatar' />
    </div>
  )
}

export default App
