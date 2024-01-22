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

const user = {
  name: 'wuyiccc',
  imageUrl: 'http://wuyiccc.com/imgs/avatar2.jpg',
  imageSize: 90
}

function UsernameDiv() {
  return <h1>{user.name}</h1>
}

function ConditionalRendering() {
  let content
  const isLoggedIn = true

  if (isLoggedIn) {
    content = <h1>Logging</h1>
  } else {
    content = <h1>no logging</h1>
  }
  return content
}

function App() {
  return (
    <div>
      <h1>welcome to my app</h1>
      <MyButton></MyButton>
      <AboutPage></AboutPage>

      <img
        src={user.imageUrl}
        className='avatar'
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
      <UsernameDiv></UsernameDiv>
      <ConditionalRendering></ConditionalRendering>
    </div>
  )
}

export default App
