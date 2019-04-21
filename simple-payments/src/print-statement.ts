import { CustomerStatement } from './datamodel'
import { padLeft } from './pad-left'
import { calculateBalance } from './calculate-balance'
import { printPaymentRow } from './print-payment-row'
import { formatAmount } from './format-amount'

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
+------------+---------------+------------------+
| Best Regards,                                 |
| Banky Bank                                    |
+-----------------------------------------------+
`
}

/**
 * Testing printStatement
 */

const mockTransactionsString = `
Date	Originator	Beneficiary	Amount
2020-01-01	Alice	Bob	£3,500.00
2020-01-16	Bob	Alice	£200.00
2020-01-30	Bob	Alice	£200.00
2020-02-01	Alice	Bob	£3,500.00
2020-02-13	Bob	Alice	£200.00
2020-02-27	Bob	Alice	£200.00
2020-03-01	Alice	Bob	£3,500.00
`

const expectedAlicesStatement = `
+-----------------------------------------------+
|                                   Hello Alice |
|                              Your balance is  |
|                                               |
| List of Your Payment Transactions             |
+-----------------------------------------------+
|          Date | Counter Party |       Amount  |
+---------------+---------------+---------------+
|    2020-01-01 |           Bob |    -£3,500.00 |
|    2020-01-02 |           Bob |      +£200.00 |
|    2020-01-02 |           Bob |      +£200.00 |
|    2020-01-02 |           Bob |      +£200.00 |
|    2020-02-01 |           Bob |    -£3,500.00 |
|    2020-02-02 |           Bob |      +£200.00 |
|    2020-02-02 |           Bob |      +£200.00 |
|    2020-03-01 |           Bob |    -£3,500.00 |
+------------+---------------+------------------+
| Best Regards,                                 |
| Banky Bank                                    |
+-----------------------------------------------+
`

const expectedBobsStatement = `
+------------------------------------------ +
| Hello Bob                                 |
| Your balance is:                          |
|                                           |
| List of Your Payment Transactions         |
+------------------------------------------ +
| Date       | Counter Party |      Amount  |
+------------+---------------+------------- +
| 2020-01-01 |         Alice |   +£3,500.00 |
| 2020-01-02 |         Alice |     -£200.00 |
| 2020-01-02 |         Alice |     -£200.00 |
| 2020-01-02 |         Alice |     -£200.00 |
| 2020-02-01 |         Alice |   +£3,500.00 |
| 2020-02-02 |         Alice |     -£200.00 |
| 2020-02-02 |         Alice |     -£200.00 |
| 2020-03-01 |         Alice |   +£3,500.00 |
+------------+---------------+--------------+
| Best Regards,                             |
| Banky Bank                                |
+-------------------------------------------+
`
