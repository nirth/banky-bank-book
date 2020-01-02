export const padLeft = (string: string, length: number): string => {
  let result = string

  while (result.length < length) {
    result = ' ' + result
  }

  return result
}

/*******************
 * Testing padLeft *
 *******************/

const expectedBob12 = '         Bob'
const actualBob12 = padLeft('Bob', 12)
const expectedAlice15 = '          Alice'
const actualAlice15 = padLeft('Alice', 15)

console.assert(
  actualBob12.length === 12,
  `Expected string to be padded until it’s length is 12,
  instead got length: ${actualBob12.length}`
)

console.assert(
  actualBob12 === '         Bob',
  `Expected string to be ${expectedBob12},
  instead got ${actualBob12}`
)

console.assert(
  actualAlice15.length === 15,
  `Expected string to be padded until it’s length is 15,
  instead got length: ${actualAlice15.length}`
)

console.assert(
  actualAlice15 === expectedAlice15,
  `Expected string to be ${expectedAlice15},
  instead got ${actualAlice15}`
)
