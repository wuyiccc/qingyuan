function identity<T, U>(x: T, y: U): T {
  console.log(x)
  console.log(y)
  return x
}

const returnValue1: number = identity<number, string>(1, 'hello')

console.log(returnValue1)

// pick type, means select some types from already defined types
interface User {
  id: number
  name: string
  age: number
}

type AgeType = Pick<User, 'id' | 'name'>

const Jack: AgeType = {
  id: 1,
  name: 'jack'
}
console.log(Jack)

export default {}
