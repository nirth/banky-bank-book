export enum Currency {
	Gbp = 'GBP',
	Usd = 'USD',
	Eur = 'EUR',
}

export enum TxType {
	CreditTransfer = 'CREDIT_TRANSFER',
	DirectDebit = 'DIRECT_DEBIT',
}

export enum CashTxStatus {
	Initiated = 'INITIATED',
	Executed = 'EXECUTED',
	Settled = 'SETTLED',
	Declined = 'DECLINED',
}

export enum EntityType {
	Person = 'PERSON',
	Company = 'COMPANY',
}

export enum CustomerType {
	Person = 'PERSON',
	Family = 'FAMILY',
	Company = 'COMPANY',
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
export type CustomerName = EntityName
export type Amount = string
export type Datetime = number

export type Person = {
	type: EntityType.Person
	name: PersonName
}

export type Company = {
	type: EntityType.Company
	name: CompanyName
	directors: EntityName[]
}

export type Bank = {
	name: string
	bic: Bic
	cashAccounts: { [accountNumber: string]: CashAccount }
}

export type CashAccount = {
	type: CustomerType
	bic: Bic
	accountNumber: string
	owner: CustomerName
	currency: Currency
	balance: Amount
	txs: CashTx[]
	settledTxs: CashTx[]
}

export type CashTx = {
	status: CashTxStatus
	txType: TxType
	senderBank: Bic
	receiverBank: Bic
	orderingCustomerCashAccount: EntityName
	beneficiaryCustomerCashAccount: EntityName
	amount: Amount
	currency: Currency
	initiatedAt: Datetime
	executedAt: Datetime
	settledAt?: Datetime
	declinedAt?: Datetime
}

export type World = {
	name: string
	banks: { [bic: string]: Bank }
	persons: { [name: string]: Person }
	companies: { [name: string]: Company }
}
