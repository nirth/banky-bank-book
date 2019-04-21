import { Txn } from './datamodel'
import { parseAmount } from './parse-amount'

export const parseTxnRow = (txnString: string): Txn => {
  const paymentParts = txnString.split('\t').map((part: string) => part.trim())

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

const expectedTxn: Txn = {
  date: new Date('2020-01-16'),
  originator: 'Bob',
  beneficiary: 'Alice',
  amount: 200,
}
const actualTxn = parseTxnRow('2020-01-16	Bob	Alice	£200.00')

console.assert(
  actualTxn.date.valueOf() === expectedTxn.date.valueOf(),
  `Expected date to be ${expectedTxn.date.valueOf()},
  instead got ${actualTxn.date.valueOf()}`
)

console.assert(
  actualTxn.originator === expectedTxn.originator,
  `Expected originator to be ${expectedTxn.originator},
  instead got ${actualTxn.originator}`
)

console.assert(
  actualTxn.beneficiary === expectedTxn.beneficiary,
  `Expected beneficiary to be ${expectedTxn.beneficiary},
  instead got ${actualTxn.beneficiary}`
)

console.assert(
  actualTxn.amount === expectedTxn.amount,
  `Expected amount to be number ${expectedTxn.amount},
  instead got ${actualTxn.amount}`
)
