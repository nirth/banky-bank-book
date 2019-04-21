import { Payment } from './datamodel'
import { padLeft } from './pad-left'
import { formatAmount } from './format-amount'

export const printPaymentRow = (payment: Payment): string => {
  const { date, amount, counterParty } = payment

  // Date
  const [dateString, timeString] = date.toISOString().split('T')
  const printDate = padLeft(dateString, 15)

  // Amount
  const formattedAmount = formatAmount(amount)
  const printAmount = padLeft(formattedAmount, 15)

  // Counter Party
  const printCounterParty = padLeft(counterParty, 15)
  return `|${printDate}|${printCounterParty}|${printAmount}|`
}

/***************************
 * Testing printPaymentRow *
 ***************************/

const mockIncomingPayment: Payment = {
  date: new Date('2020-04-01'),
  amount: 200,
  counterParty: 'Bob',
}

const expectedPaymentRow = '|    2020-04-01 |           Bob |      +£200.00 |'
const actualPaymentRow = printPaymentRow(mockIncomingPayment)
