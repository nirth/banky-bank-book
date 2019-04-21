import { CustomerStatement, Ledger } from './datamodel'
import { extractCustomersPayments } from './extract-customers-payments'
import { calculateBalance } from './calculate-balance'

export const createCustomerStatement = (
  ledger: Ledger,
  customer: string,
  yearStartBalance: number
): CustomerStatement => {
  const payments = extractCustomersPayments(ledger, customer)

  return {
    customer,
    year: new Date('2020'),
    yearStartBalance,
    payments,
  }
}

/************************************
 * Testing createCustomerStatements *
 ************************************/

const mockTsvString = `
Date	Originator	Beneficiary	Amount
2020-01-01	Alice	Bob	£3,500.00
2020-01-16	Bob	Alice	£200.00
2020-01-30	Bob	Alice	£200.00
2020-02-01	Alice	Bob	£3,500.00
2020-02-13	Bob	Alice	£200.00
2020-02-27	Bob	Alice	£200.00
2020-03-01	Alice	Bob	£3,500.00
`

const expectedAlicesStement: CustomerStatement = {
  customer: 'Alice',
  year: new Date('2020'),
  yearStartBalance: 100000,
  payments: [],
}

const expectedBobsStatement: CustomerStatement = {
  customer: 'Bob',
  year: new Date('2020'),
  yearStartBalance: 0,
  payments: [],
}

const expectredClaresStatement: CustomerStatement = {
  customer: 'Clare',
  year: new Date('2020'),
  yearStartBalance: 0,
  payments: [],
}
