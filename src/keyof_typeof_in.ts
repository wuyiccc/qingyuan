interface Person {
  id: number
  name: number
  age: number
}

// keyof and in
// 'id' | 'name' | 'age'
type K1 = keyof Person

type User = {
  [k in K1]: number
}

const jack: User = {
  id: 1,
  name: 1,
  age: 1
}

console.log(jack)

// typeof

type NewType = typeof jack
const newUser: NewType = {
  id: 1,
  name: 1,
  age: 1
}

console.log(newUser)

export default {}
