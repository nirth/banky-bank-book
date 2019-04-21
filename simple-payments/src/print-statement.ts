import { CustomerStatement, Ledger, Payment } from './datamodel'
import { padLeft } from './pad-left'
import { calculateBalance } from './calculate-balance'
import { printPaymentRow } from './print-payment-row'
import { formatAmount } from './format-amount'
import { createCustomerStatement } from './create-customer-statement'

export const printStatement = (statement: CustomerStatement): string => {
  const { customer, yearStartBalance, payments } = statement
  const greetingString = padLeft(`Hello ${customer}`, 46)
  const yearEndBalance = calculateBalance(payments, yearStartBalance)
  const formattedYearEndAmount = formatAmount(yearEndBalance)
  const yearEndBalanceString = padLeft(
    `Your balance is ${formattedYearEndAmount}`,
    46
  )

  return `
+-----------------------------------------------+
|${greetingString} |
|${yearEndBalanceString} |
|                                               |
| List of Your Payment Transactions             |
+-----------------------------------------------+
|          Date | Counter Party |       Amount  |
+---------------+---------------+---------------+
${payments.map(printPaymentRow).join('\n')}
+---------------+---------------+---------------+
| Best Regards,                                 |
| Banky Bank                                    |
+-----------------------------------------------+
`
}

/**
 * Testing printStatement
 */

const mockPayments: Payment[] = [
  {
    date: new Date('2020-01-01'),
    counterParty: 'Bob',
    amount: -3500.0,
  },
  {
    date: new Date('2020-01-02'),
    counterParty: 'Bob',
    amount: 200,
  },
  {
    date: new Date('2020-01-16'),
    counterParty: 'Bob',
    amount: 200,
  },
  {
    date: new Date('2020-01-30'),
    counterParty: 'Bob',
    amount: 200,
  },
  {
    date: new Date('2020-02-01'),
    counterParty: 'Bob',
    amount: -3500,
  },
  {
    date: new Date('2020-02-13'),
    counterParty: 'Bob',
    amount: 200,
  },
  {
    date: new Date('2020-02-27'),
    counterParty: 'Bob',
    amount: 200,
  },
  {
    date: new Date('2020-03-01'),
    counterParty: 'Bob',
    amount: -3500,
  },
]
const mockAliceStatement: CustomerStatement = {
  customer: 'Alice',
  year: new Date('2020'),
  yearStartBalance: 0,
  payments: mockPayments,
}

const expectedAlicesPrintStatement = `
+-----------------------------------------------+
|                                   Hello Alice |
|                    Your balance is -£9,500.00 |
|                                               |
| List of Your Payment Transactions             |
+-----------------------------------------------+
|          Date | Counter Party |       Amount  |
+---------------+---------------+---------------+
|    2020-01-01 |           Bob |    -£3,500.00 |
|    2020-01-02 |           Bob |       £200.00 |
|    2020-01-16 |           Bob |       £200.00 |
|    2020-01-30 |           Bob |       £200.00 |
|    2020-02-01 |           Bob |    -£3,500.00 |
|    2020-02-13 |           Bob |       £200.00 |
|    2020-02-27 |           Bob |       £200.00 |
|    2020-03-01 |           Bob |    -£3,500.00 |
+---------------+---------------+---------------+
| Best Regards,                                 |
| Banky Bank                                    |
+-----------------------------------------------+
`
const actualAlicesPrintStatement = printStatement(mockAliceStatement)

console.assert(
  actualAlicesPrintStatement === expectedAlicesPrintStatement,
  `Expected statement to look like ${expectedAlicesPrintStatement},
  instead got ${actualAlicesPrintStatement}`
)
