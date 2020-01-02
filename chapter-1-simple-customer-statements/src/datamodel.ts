export type Ledger = Txn[]

export type Txn = {
  date: Date
  originator: string
  beneficiary: string
  amount: number
}

export type Payment = {
  date: Date
  counterParty: string
  amount: number
}

export type CustomerStatement = {
  customer: string
  year: Date
  payments: Payment[]
  yearStartBalance: number
}

export type TxnToPayment = (customer: string, txn: Txn) => Payment

export type PaymentsToBalance = (
  previousBalance: number,
  payments: Payment[]
) => number
