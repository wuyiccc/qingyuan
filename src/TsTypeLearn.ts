const name: string = 'jack'
console.log(name)

// const age: number = 30

// const isTrue: boolean = true

// const a: undefined = undefined

// const b: null = null

// const user: object = {}

// const big: bigint = 100n

// const sym: symbol = Symbol('happen')

// array type definition
const list1: number[] = [1, 2, 3]
const list2: Array<number> = [1, 2, 3]

console.log(list1)
console.log(list2)

const list3: [number, string, boolean] = [1, '2', true]
console.log(list3)

const list4: [{ name: string; age: number }] = [{ name: 'jack', age: 30 }]
console.log(list4)

const list5: Array<{ name: string; age: number }> = [{ name: 'jack', age: 30 }]
console.log(list5)

interface User {
  name: string
  age: number
}

const list6: Array<User> = [{ name: 'jack', age: 30 }]
console.log(list6)

// function return value type definition

function add1(a: number, b: number): number {
  return a + b
}

add1(1, 2)

function add2(a: number, b: number): void {
  console.log(a + b)
}
add2(1, 2)

function add3(a: number, b: number): unknown {
  throw new Error(a + b + 'Error')
}

add3(1, 2)

const add4 = (a: number, b: number): number => {
  return a + b
}
add4(1, 2)

const add5: (a: number, b: number) => number = (a, b) => {
  return a + b
}

add5(1, 2)

// 元组
const listTuple: [number, string, boolean] = [1, '2', true]

// 交叉类型
type AgeType = { age: number }
type UserType = { id: number; name: string }

const userAge: AgeType = { age: 30 }
const userInfo: UserType = { id: 1, name: 'jack' }
const user: AgeType & UserType = { id: 1, name: 'jack', age: 20 }

console.log(listTuple)
console.log(userAge)
console.log(userInfo)
console.log(user)

export default {}
