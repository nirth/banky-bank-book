import { Payment } from './datamodel'

const addAmount = (total: number, amount: number): number => total + amount

export const calculateBalance = (
  payments: Payment[],
  previousBalance: number
): number => {
  const amounts = payments.map(payment => payment.amount)
  const sum = amounts.reduce(addAmount, previousBalance)

  return sum
}

/****************************
 * Testing calculateBalance *
 ****************************/

// const mockPayments =
