export type Payment = {
  date: Date
  originator: string
  beneficiary: string
  amount: number
}

export type PaymentFactory = (
  date: Date,
  originator: string,
  beneficiary: string,
  amount: number
) => Payment

export type Ledger = {
  payments: Payment[]
}

export type Balance = number
