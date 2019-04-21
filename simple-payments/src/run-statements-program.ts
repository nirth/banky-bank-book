import { parseLedger } from './parse-ledger'
import { createCustomerStatement } from './create-customer-statement'
import { printStatement } from './print-statement'
import { year2020transactions } from './assets/year2020'

const year2020Ledger = parseLedger(year2020transactions)
const alicesStatement = createCustomerStatement(year2020Ledger, 'Alice', 0)
const bobsStatement = createCustomerStatement(year2020Ledger, 'Bob', 0)

console.log(printStatement(alicesStatement))

console.log(printStatement(bobsStatement))
