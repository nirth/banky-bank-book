import { Payment, Txn, TxnToPayment } from './datamodel'
import { parseTxnRow } from './parse-txn-row'

export const txnToPayment: TxnToPayment = (
  customer: string,
  txn: Txn
): Payment => {
  if (txn.beneficiary === customer) {
    return {
      date: txn.date,
      amount: txn.amount,
      counterParty: txn.originator,
    }
  } else {
    return {
      date: txn.date,
      amount: txn.amount * -1,
      counterParty: txn.beneficiary,
    }
  }
}

/************************
 * Testing txnToPayment *
 ************************/

const mockTxn: Txn = parseTxnRow('2020-01-01	Alice	Bob	£3,500.00')

const expectedAlicePayment = {
  date: mockTxn.date,
  amount: mockTxn.amount * -1,
}

const expectedBobsPayment = {
  date: mockTxn.date,
  amount: mockTxn.amount,
}

const actualAlicePayment = txnToPayment('Alice', mockTxn)
const actualBobsPayment = txnToPayment('Bob', mockTxn)

console.assert(
  actualAlicePayment.amount === expectedAlicePayment.amount,
  `Expected Alice’s amount to be ${expectedAlicePayment.amount},
  instead got ${actualAlicePayment.amount}`
)

console.assert(
  actualBobsPayment.amount === expectedBobsPayment.amount,
  `Expected Bob’s amount to be ${expectedBobsPayment.amount},
  instead got ${actualBobsPayment.amount}`
)
