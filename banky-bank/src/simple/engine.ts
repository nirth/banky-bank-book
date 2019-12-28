import {
	Bank,
	Bic,
	PersonName,
	Person,
	EntityName,
	Company,
	EntityType,
	CashAccount,
	CustomerName,
	Currency,
	Amount,
	CustomerType,
} from './datamodel'

export const createBank = (name: string, bic: Bic): Bank => {
	return { name, bic, cashAccounts: {} }
}

export const createPerson = (name: PersonName): Person => {
	return { type: EntityType.Person, name }
}

export const createCompany = (name: string, directors: EntityName[]): Company => {
	return { type: EntityType.Company, name, directors }
}

export const createCashAccount = (
	type: CustomerType,
	bic: Bic,
	owner: CustomerName,
	accountNumber: string,
	currency: Currency,
	initialBalance: Amount
): CashAccount => ({
	type,
	bic,
	owner,
	accountNumber,
	currency,
	balance: initialBalance,
	txs: [],
	settledTxs: [],
})
