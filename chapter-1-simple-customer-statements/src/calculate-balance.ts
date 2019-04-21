import { Payment, PaymentsToBalance } from './datamodel'

const addAmount = (total: number, amount: number): number => total + amount

export const calculateBalance: PaymentsToBalance = (
  previousBalance: number,
  payments: Payment[]
): number => {
  const amounts = payments.map(payment => payment.amount)
  const sum = amounts.reduce(addAmount, previousBalance)

  return sum
}

/****************************
 * Testing calculateBalance *
 ****************************/

const mockPayments: Payment[] = [
  { date: new Date('2020-04-01'), amount: -200, counterParty: 'Alice' },
  { date: new Date('2020-04-01'), amount: -200, counterParty: 'Alice' },
  { date: new Date('2020-04-01'), amount: 3500, counterParty: 'Alice' },
]

const expectedBalance = 3100
const actualBalance = calculateBalance(0, mockPayments)

console.assert(
  actualBalance === expectedBalance,
  `Expected balance to be ${expectedBalance},
  instead got ${actualBalance}`
)
