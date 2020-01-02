export const formatAmount = (amount: number): string => {
  const prefix = amount < 0 ? '-' : ''
  const absAmount = Math.abs(amount)
  const formattedNumber = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(absAmount)
  return `${prefix}${formattedNumber}`
}

/***********************
 * Testing printAmount *
 ***********************/

const mockPositiveAmount = 10000
const mockNegativeAmount = -5000

const expectedPositivePrintAmount = '£10,000.00'
const actualPositivePrintAmount = formatAmount(mockPositiveAmount)

const expectedNegativePrintAmount = '-£5,000.00'
const actualNegativePrintAmount = formatAmount(mockNegativeAmount)

console.assert(
  actualPositivePrintAmount === expectedPositivePrintAmount,
  `Expected parsed amount to look like ${expectedPositivePrintAmount},
  instead got ${actualPositivePrintAmount}`
)

console.assert(
  actualNegativePrintAmount === expectedNegativePrintAmount,
  `Expected parsed amount to look like ${expectedNegativePrintAmount},
  instead got ${actualNegativePrintAmount}`
)
