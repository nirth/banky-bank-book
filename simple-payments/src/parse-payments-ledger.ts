import { Ledger } from './datamodel'
import { parsePaymentRow } from './parse-payment-row'
import { notEmptyString } from './not-empty-string'

const parsePaymentsLedger = (paymentsTsv: string): Ledger => {
  console.log(paymentsTsv)
  const payments = paymentsTsv
    .split('\n')
    .filter(notEmptyString)
    .splice(1)
    .map(parsePaymentRow)

  return {
    payments,
  }
}

/******************************
 * Testing parsePaymentsTable *
 ******************************/

const expectedLedger: Ledger = {
  payments: [
    parsePaymentRow('2019-12-31	Cash Deposit	Alice	£100,000.00'),
    parsePaymentRow('2020-01-01	Alice	Bob	£3,500.00'),
    parsePaymentRow('2020-01-16	Bob	Alice	£200.00'),
    parsePaymentRow('2020-01-30	Bob	Alice	£200.00'),
    parsePaymentRow('2020-02-01	Alice	Bob	£3,500.00'),
    parsePaymentRow('2020-02-13	Bob	Alice	£200.00'),
    parsePaymentRow('2020-02-27	Bob	Alice	£200.00'),
    parsePaymentRow('2020-03-01	Alice	Bob	£3,500.00'),
  ],
}

const actualLedger: Ledger = parsePaymentsLedger(`
Date	Originator	Beneficiary	Amount
2019-12-31	Cash Deposit	Alice	£100,000.00
2020-01-01	Alice	Bob	£3,500.00
2020-01-16	Bob	Alice	£200.00
2020-01-30	Bob	Alice	£200.00
2020-02-01	Alice	Bob	£3,500.00
2020-02-13	Bob	Alice	£200.00
2020-02-27	Bob	Alice	£200.00
2020-03-01	Alice	Bob	£3,500.00
`)

console.assert(
  actualLedger.payments.length === expectedLedger.payments.length,
  `
  Expected parsed ledger to contain ${expectedLedger.payments.length} payments,
  instead got ${actualLedger.payments.length}`
)
