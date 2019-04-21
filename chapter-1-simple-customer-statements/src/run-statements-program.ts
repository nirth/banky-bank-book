import { parseLedger } from './parse-ledger'
import { createCustomerStatement } from './create-customer-statement'
import { printStatement } from './print-statement'
import { year2020transactions } from './assets/year2020'

const year2020Ledger = parseLedger(year2020transactions)

const alicesStatement = createCustomerStatement(
  year2020Ledger,
  'Alice',
  new Date('2020'),
  0
)
const bobsStatement = createCustomerStatement(
  year2020Ledger,
  'Bob',
  new Date('2020'),
  0
)

console.info('Generating Statement for Alice')
console.info(printStatement(alicesStatement))

console.info('Generating Statement for Bob')
console.info(printStatement(bobsStatement))
