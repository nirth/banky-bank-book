import { Payment, Txn, TxnToPayment } from './datamodel'

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

const mockTxn: Txn = {
  date: new Date('2020-01-01'),
  originator: 'Alice',
  beneficiary: 'Bob',
  amount: 3500,
}

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
