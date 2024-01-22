import './App.css'
import { useState } from 'react'

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

function RenderList() {
  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 }
  ]

  const listItems = products.map(product => (
    <li key={product.id} style={{ color: product.isFruit ? 'magenta' : 'darkgreen' }}>
      {product.title}
    </li>
  ))

  return <ul>{listItems}</ul>
}

function handleClick() {
  alert('You clicked me')
}

function RespondingToEvent() {
  return <button onClick={handleClick}>Click me</button>
}

function UpdatingScreen() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>Clicked {count} times</button>
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
      <RenderList></RenderList>
      <RespondingToEvent></RespondingToEvent>
      <UpdatingScreen></UpdatingScreen>
    </div>
  )
}

export default App
