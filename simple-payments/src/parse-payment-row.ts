import { Payment } from './datamodel'
import { parseAmount } from './parse-amount'

export const parsePaymentRow = (paymentRow: string): Payment => {
  const paymentParts = paymentRow.split('\t').map((part: string) => part.trim())

  const [dateString, originator, beneficiary, amountString] = paymentParts
  const date = new Date(dateString)
  const amount = parseAmount(amountString)

  return {
    date,
    originator,
    beneficiary,
    amount,
  }
}

/***************************
 * Testing parsePaymentRow *
 ***************************/

const actualPayment = parsePaymentRow('2020-01-16	Bob	Alice	£200.00')

console.assert(
  actualPayment.date.valueOf() === new Date('2020-01-16').valueOf(),
  `Dates should match, instead got ${actualPayment.date.valueOf()}`
)
console.assert(
  actualPayment.originator === 'Bob',
  'Expected originator to be Bob'
)
console.assert(
  actualPayment.beneficiary === 'Alice',
  'Expected beneficiary to be Alice'
)
console.assert(
  actualPayment.amount === 200,
  `Expected amount to be number 200, instead got ${actualPayment.amount}`
)
