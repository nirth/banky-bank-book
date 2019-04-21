import { CustomerStatement, Ledger, Payment, Txn } from './datamodel'
import { extractCustomersPayments } from './extract-customers-payments'

export const createCustomerStatement = (
  ledger: Ledger,
  customer: string,
  year: Date,
  yearStartBalance: number
): CustomerStatement => {
  const payments = extractCustomersPayments(ledger, customer)

  return {
    customer,
    year,
    yearStartBalance,
    payments,
  }
}

/************************************
 * Testing createCustomerStatements *
 ************************************/

const mockLedger: Ledger = [
  {
    date: new Date('2020-04-01'),
    originator: 'Alice',
    beneficiary: 'Bob',
    amount: 3500,
  },
  {
    date: new Date('2020-04-01'),
    originator: 'Bob',
    beneficiary: 'Alice',
    amount: 200,
  },
  {
    date: new Date('2020-04-01'),
    originator: 'Bob',
    beneficiary: 'Alice',
    amount: 200,
  },
  {
    date: new Date('2020-04-01'),
    originator: 'Alice',
    beneficiary: 'Bob',
    amount: 3500,
  },
]

const expectedAlicesPayments: Payment[] = [
  { date: new Date('2020-04-01'), counterParty: 'Bob', amount: -3500 },
  { date: new Date('2020-04-01'), counterParty: 'Bob', amount: 200 },
  { date: new Date('2020-04-01'), counterParty: 'Bob', amount: 200 },
  { date: new Date('2020-04-01'), counterParty: 'Bob', amount: -3500 },
]

const expectedAlicesStement: CustomerStatement = {
  customer: 'Alice',
  year: new Date('2020'),
  yearStartBalance: 100000,
  payments: expectedAlicesPayments,
}

const actualAlicesStatement = createCustomerStatement(
  mockLedger,
  'Alice',
  new Date('2020'),
  0
)

console.assert(
  actualAlicesStatement.payments.length === expectedAlicesPayments.length,
  `Expected number of payments to be ${expectedAlicesPayments.length},
  instead got ${actualAlicesStatement.payments.length}`
)

console.assert(
  actualAlicesStatement.payments[0].amount === expectedAlicesPayments[0].amount,
  `Expected amount of first payment to be ${expectedAlicesPayments[0].amount},
  instead got ${actualAlicesStatement.payments[0].amount}`
)

console.assert(
  actualAlicesStatement.payments[1].amount === expectedAlicesPayments[1].amount,
  `Expected amount of second payment to be ${expectedAlicesPayments[1].amount},
  instead got ${actualAlicesStatement.payments[1].amount}`
)
