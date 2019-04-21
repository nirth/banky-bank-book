import { Ledger, Payment, Txn } from './datamodel'
import { txnToPayment } from './txn-to-payment'
import { parseLedger } from './parse-ledger'

export const extractCustomersPayments = (
  ledger: Ledger,
  customer: string
): Payment[] => {
  const relevantTxns = ledger.filter(txn => {
    return txn.originator === customer || txn.beneficiary === customer
  })

  const customersPayments = relevantTxns.map(txn => txnToPayment(customer, txn))

  return customersPayments
}

/****************************
 * Testing customerPayments *
 ****************************/

const mockTsvString = `
Date	Originator	Beneficiary	Amount
2019-12-31	Cash Deposit	Alice	£100,000.00
2020-01-01	Alice	Bob	£3,500.00
2020-01-16	Bob	Alice	£200.00
2020-01-30	Bob	Alice	£200.00
2020-02-01	Alice	Bob	£3,500.00
2020-02-13	Bob	Alice	£200.00
2020-02-27	Bob	Alice	£200.00
2020-03-01	Alice	Bob	£3,500.00
`
const mockLedger = parseLedger(mockTsvString)

const expectedBobsPayments = [
  { date: '2020-01-01', amount: 3500 },
  { date: '2020-01-16', amount: -200 },
  { date: '2020-01-30', amount: -200 },
  { date: '2020-02-01', amount: 3500 },
  { date: '2020-02-13', amount: -200 },
  { date: '2020-02-27', amount: -200 },
  { date: '2020-03-01', amount: 3500 },
]
const actualBobsPayments = extractCustomersPayments(mockLedger, 'Bob')

const expectedAlicesPayments = [
  { date: '2019-12-31', amount: 100000 },
  { date: '2020-01-01', amount: -3500 },
  { date: '2020-01-16', amount: 200 },
  { date: '2020-01-30', amount: 200 },
  { date: '2020-02-01', amount: -3500 },
  { date: '2020-02-13', amount: 200 },
  { date: '2020-02-27', amount: 200 },
  { date: '2020-03-01', amount: -3500 },
]
const actualAlicesPayments = extractCustomersPayments(mockLedger, 'Alice')

const actualClaresPayments = extractCustomersPayments(mockLedger, 'Clare')

console.assert(
  actualBobsPayments.length === expectedBobsPayments.length,
  `Expected Bob to have ${expectedBobsPayments.length} payments,
  instead got ${actualBobsPayments.length}`
)

console.assert(
  actualAlicesPayments.length === expectedAlicesPayments.length,
  `Expected Bob to have ${expectedAlicesPayments.length} payments,
  instead got ${actualAlicesPayments.length}`
)

console.assert(
  actualClaresPayments.length === 0,
  `Expected Bob to have ${0} payments,
  instead got ${actualClaresPayments.length}`
)
