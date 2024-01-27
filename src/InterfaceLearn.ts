interface Person {
  name: string
  age: number
}

const jack: Person = {
  name: 'jack',
  age: 30
}

console.log(jack)

interface P {
  // readonly var
  readonly name: string
  // selectable var
  age?: number
}

const p1: P = {
  name: 'p1'
}

console.log(p1)

interface T {
  name: string
  age: number

  // dynamic variables, dynamic variables type must come from the pre define type, such as string and number
  [k: string]: string | number
}

const a: T = {
  name: 'jack',
  age: 1,
  id: 1,
  gender: 'man'
}

// function interface define
interface Sum {
  (x: number, y: number): number
}

type Sum1 = (x: number, y: number) => number

const addSum: Sum = (x, y) => {
  return x + y
}

addSum(1, 2)

const addSum1: Sum1 = (x, y) => {
  return x + y
}

addSum1(1, 2)

console.log(a)

// interface extends

interface U {
  id: number
  name: string
}

interface SubPerson extends U {
  age: number
}

const tim: SubPerson = {
  id: 1,
  name: 'tim',
  age: 33
}

console.log(tim)

type U1 = { id: number; name: string }

type SubPerson1 = { age: number } & U1
const tim1: SubPerson1 = {
  id: 1,
  name: 'tim1',
  age: 33
}
console.log(tim1)

export default {}
