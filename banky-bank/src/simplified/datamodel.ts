export enum Currency {
	Gbp = 'GBP',
	Usd = 'USD',
	Eur = 'EUR',
}

export enum TxType {
	CreditTransfer = 'CREDIT_TRANSFER',
	DirectDebit = 'DIRECT_DEBIT',
}

export type SimplifiedDatetime = {
	year: number
	month: number
	day: number
}

export type Bic = string
export type PersonName = string
export type CompanyName = string
export type EntityName = PersonName | CompanyName
export type Amount = string

export type Person = {
	name: PersonName
}

export type Company = {
	name: CompanyName
	directors: EntityName[]
}

export type Bank = {
	name: string
	bic: Bic
	cashAccounts: { [accountNumber: string]: CashAccount }
}

export type CashAccount = {
	bic: Bic
	accountNumber: string
	owner: EntityName
	currency: Currency
	balance: Amount
	txs: CashTx[]
	settledTxs: CashTx[]
}

export type CashTx = {
	txType: TxType
	senderBank: Bic
	receiverBank: Bic
	orderingCustomerCashAccount: EntityName
	beneficiaryCustomerCashAccount: EntityName
	amount: Amount
	currency: Currency
}

export type World = {
	name: string
	banks: { [bic: string]: Bank }
	persons: { [name: string]: Person }
	companies: { [name: string]: Company }
}
