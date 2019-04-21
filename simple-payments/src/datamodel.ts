export type Txn = {
  date: Date
  originator: string
  beneficiary: string
  amount: number
}

export type Ledger = Txn[]

export type Payment = {
  date: Date
  amount: number
  counterParty: string
}

export type CustomerStatement = {
  customer: string
  year: Date
  payments: Payment[]
  yearStartBalance: number
}

export type TxnToPayment = (customer: string, txn: Txn) => Payment
export type PaymentsToBalance = (payments: Payment[]) => number
