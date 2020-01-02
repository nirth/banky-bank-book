import { Ledger } from './datamodel'
import { notEmptyString } from './not-empty-string'
import { parseRowToTxn } from './parse-row-to-txn'

export const parseLedger = (tsvString: string): Ledger => {
  const splitRows = tsvString.split('\n')
  const nonEmptyRows = splitRows.filter(notEmptyString)
  const validTxnRows = nonEmptyRows.splice(1)
  const parsedTxns = validTxnRows.map(parseRowToTxn)

  return parsedTxns
}

/******************************
 * Testing parsePaymentsTable *
 ******************************/

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

const expectedLedger: Ledger = [
  parseRowToTxn('2020-01-01	Alice	Bob	£3,500.00'),
  parseRowToTxn('2020-01-16	Bob	Alice	£200.00'),
  parseRowToTxn('2020-01-30	Bob	Alice	£200.00'),
  parseRowToTxn('2020-02-01	Alice	Bob	£3,500.00'),
  parseRowToTxn('2020-02-13	Bob	Alice	£200.00'),
  parseRowToTxn('2020-02-27	Bob	Alice	£200.00'),
  parseRowToTxn('2020-03-01	Alice	Bob	£3,500.00'),
]

const actualLedger: Ledger = parseLedger(mockTsvString)

console.assert(
  actualLedger.length === expectedLedger.length,
  `Expected parsed ledger to contain ${expectedLedger.length} payments,
  instead got ${actualLedger.length}`
)

for (let i = 0; i < expectedLedger.length; i++) {
  const expected = expectedLedger[i]
  const actual = actualLedger[i]

  console.assert(
    actual.amount === expected.amount,
    `Expected amount to be ${expected.amount}, instead got ${actual.amount}`
  )
}
