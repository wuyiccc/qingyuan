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
    </div>
  )
}

export default App
