import { Ledger } from './datamodel'
import { parseTxnRow } from './parse-txn-row'
import { notEmptyString } from './not-empty-string'

export const parseLedger = (tsvString: string): Ledger => {
  const splitRows = tsvString.split('\n')
  const nonEmptyRows = splitRows.filter(notEmptyString)
  const validTxnRows = nonEmptyRows.splice(1)
  const parsedTxns = validTxnRows.map(parseTxnRow)

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
  parseTxnRow('2019-12-31	Cash Deposit	Alice	£100,000.00'),
  parseTxnRow('2020-01-01	Alice	Bob	£3,500.00'),
  parseTxnRow('2020-01-16	Bob	Alice	£200.00'),
  parseTxnRow('2020-01-30	Bob	Alice	£200.00'),
  parseTxnRow('2020-02-01	Alice	Bob	£3,500.00'),
  parseTxnRow('2020-02-13	Bob	Alice	£200.00'),
  parseTxnRow('2020-02-27	Bob	Alice	£200.00'),
  parseTxnRow('2020-03-01	Alice	Bob	£3,500.00'),
]

const actualLedger: Ledger = parseLedger(mockTsvString)

console.assert(
  actualLedger.length === expectedLedger.length,
  `Expected parsed ledger to contain ${expectedLedger.length} payments,
  instead got ${actualLedger.length}`
)
