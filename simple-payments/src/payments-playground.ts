import { Payment, Ledger } from './datamodel'
import { notEmptyString } from './not-empty-string'

const parsePaymentRow = (row: string): Payment => {
  const cleanedParts = secondRow
    .split('|')
    .filter(notEmptyString)
    .map((rowPart: string) => rowPart.trim())

  const [dateString, originator, beneficiary, amountString] = cleanedParts
  const date = new Date(dateString)
  const amount = parseFloat(amountString)

  return {
    date,
    originator,
    beneficiary,
    amount,
  }
}

const secondRow = '| 2020-01-01 | Alice      | Bob         |   3500.00 |'
const secondPayment = parsePaymentRow(secondRow)

console.assert(
  secondPayment.date.valueOf() === new Date('2020-01-01').valueOf(),
  'Dates should match'
)
console.assert(
  secondPayment.originator === 'Alice',
  'Expected originator to be Alice'
)
console.assert(
  secondPayment.beneficiary === 'Bob',
  'Expected beneficiary to be Bob'
)
console.assert(
  secondPayment.amount === 3500,
  'Expected amount to be number 3500'
)

const year2020Table = `
| Date       | Originator | Beneficiary |    Amount |
+------------+------------+-------------+-----------+
| 2020-01-01 | Check      | Alice       | 100000.00 |
| 2020-01-01 | Alice      | Bob         |   3500.00 |
| 2020-01-16 | Bob        | Alice       |    200.00 |
| 2020-01-30 | Bob        | Alice       |    200.00 |
| 2020-02-01 | Alice      | Bob         |   3500.00 |
`

const year2020Ledger: Ledger = {
  payments: [
    parsePaymentRow('| 2020-01-01 | Check      | Alice       | 100000.00 |'),
    parsePaymentRow('| 2020-01-01 | Alice      | Bob         |   3500.00 |'),
  ],
}
