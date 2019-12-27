import {
	CashBankAccount,
	CompanyName,
	PersonName,
	Bic,
	Company,
	EntityName,
	Person,
	Bank,
	World,
} from './datamodel'

class Scenario {
	world: World

	constructor(name: string) {
		this.world = { name, banks: {}, persons: {}, companies: {} }
	}

	createBank(name: string, bic: Bic): Scenario {
		const bank: Bank = { name, bic, cashAccounts: {} }
		this.world.banks[bic] = bank
		return this
	}

	createPerson(name: PersonName): Scenario {
		const person: Person = { name }
		this.world.persons[name] = person
		return this
	}

	createCompany(name: CompanyName, directors: EntityName[]): Scenario {
		const company: Company = { name, directors }
		this.world.companies[name] = company
		return this
	}

	createPersonCashAccount(bic: Bic, personName: PersonName, accountNumber: string): Scenario {
		const cashAccount: CashBankAccount = { bic, accountNumber, owner: personName }
		const bank: Bank = this.world.banks[bic]
		bank.cashAccounts[accountNumber] = cashAccount
		return this
	}

	createCompanyCashAccount(bic: Bic, companyName: CompanyName, accountNumber: string): Scenario {
		const cashAccount: CashBankAccount = { bic, accountNumber, owner: companyName }
		const bank: Bank = this.world.banks[bic]
		bank.cashAccounts[accountNumber] = cashAccount
		return this
	}
}

export { Scenario }
