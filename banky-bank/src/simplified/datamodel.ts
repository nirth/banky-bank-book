export type Bic = string
export type PersonName = string
export type CompanyName = string
export type EntityName = PersonName | CompanyName

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
	cashAccounts: { [accountNumber: string]: CashBankAccount }
}

export type CashBankAccount = {
	bic: Bic
	accountNumber: string
	owner: EntityName
}

export type World = {
	name: string
	banks: { [bic: string]: Bank }
	persons: { [name: string]: Person }
	companies: { [name: string]: Company }
}
