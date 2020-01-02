export enum Currency {
	Gbp = 'GBP',
	Eur = 'EUR',
}

export type Bic = string

type World = {
	persons: { [key: string]: Person }
	banks: { [key: string]: Bank }
}

type Person = {
	name: string
}

type Bank = {
	name: string
	bic: Bic
	customers: { [key: string]: Customer }
}

type Ownership = {
	owner: string
  percentShare: number
  authorization: 
}

type Customer = {
	primaryOwner: string
	owners: string[]
}

type CashAccount = {
	bic: Bic
	owners: string[]
	accountNumber: string
	interestRate: number
}

class BankyBankWorld {
	private _world: World
	constructor() {
		this._world = {
			persons: {},
			banks: {},
		}
	}

	get world(): World {
		return this._world
	}

	createPerson(name: string): Person {
		const person: Person = { name }
		this._world.persons[name] = person
		return person
	}

	createBank(name: string, bic: Bic): Bank {
		const bank: Bank = { name, bic, customers: {} }
		this._world.banks[bic] = bank
		return bank
	}

	onboardIndividual(person: Person, bank: Bank): Customer {
    const primaryOwner = person.name
		const customer: Customer = { primaryOwner, owners: [person.name] }
		bank.customers[primaryOwner] = customer
		return customer
	}

	createCashAccount(
		bank: Bank,
		owners: Customer[],
		accountNumber: string,
		interestRate: number = 1
	): CashAccount {
		const cashAccount: CashAccount = {
			bic: bank.bic,
			owners: ),
			accountNumber,
			interestRate,
    }
    
    bank.cashAccounts[accountNumber] = cashAccount

		return cashAccount
	}
}

const bankyBankWorld = new BankyBankWorld()
const world = bankyBankWorld.world

const alice: Person = bankyBankWorld.createPerson('Alice')
const bob: Person = bankyBankWorld.createPerson('Bob')

const acmeBank: Bank = bankyBankWorld.createBank('Acme Bank', 'ACBANK33')
const bankyBank: Bank = bankyBankWorld.createBank('Banky Bank', 'BBAN44')

const aliceCustomer = bankyBankWorld.onboardIndividual(alice, acmeBank)
const bobCustomer = bankyBankWorld.onboardIndividual(bob, bankyBank)

bankyBankWorld.createCashAccount(acmeBank, alice, '1001')
bankyBankWorld.createCashAccount(bankyBank, bob, '1001')

console.log('world:', JSON.stringify(bankyBankWorld.world))

// const alicesCurrentCashAccount: CashAccount = bankyBankWorld.createCashAccount(
//   alice,

// )

// class Person {
// 	private _name: string

// 	constructor(name: string) {
// 		this._name = name
// 	}

// 	get name(): string {
// 		return this._name
// 	}
// }

// class Company {
// 	private name: string
// 	private owners: string[]

// 	constructor(name: string, owners: string[]) {
// 		this.name = name
// 		this.owners = owners
// 	}
// }

// type Customer = {
// 	owner: string
// }

// class BankyBank {
// 	private name: string
// 	private bic: Bic
// 	private individualCustomers: Customer[]

// 	constructor(name: string, bic: Bic) {
// 		this.name = name
// 		this.bic = bic
// 		this.individualCustomers = []
// 	}

// 	onboardIndividualCustomer(person: Person) {
// 		const customer: Customer = {
// 			owner: person.name,
// 		}

// 		this.individualCustomers.push(customer)
// 	}
// }
