export const parseAmount = (amountString: string): number => {
  const digitsOnly = amountString
    .split('£')
    .join('')
    .split(',')
    .join('')

  const amount = parseInt(digitsOnly)

  return amount
}

/***********************
 * Testing parseAmount *
 ***********************/

const expectedAmount = 3500
const actualAmount = parseAmount('£3,500.00')

console.assert(
  expectedAmount === actualAmount,
  `Expected amount to be ${expectedAmount}, instead got ${actualAmount}`
)
