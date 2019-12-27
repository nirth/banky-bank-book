import {
	CashAccount,
	CompanyName,
	PersonName,
	Bic,
	Company,
	EntityName,
	Person,
	Bank,
	World,
	CashTx,
	Amount,
	Currency,
	SimplifiedDatetime,
	TxType,
} from './datamodel'
import { computeAmount, fromAmount, toAmount } from './utils'

class Scenario {
	world: World
	simplifiedDatetime: SimplifiedDatetime = { year: -1, month: -1, day: -1 }

	constructor(name: string, datetime: SimplifiedDatetime) {
		this.world = { name, banks: {}, persons: {}, companies: {} }
		this.setDatetime(datetime)
	}

	setDatetime(datetime: SimplifiedDatetime): Scenario {
		this.simplifiedDatetime = datetime
		return this
	}

	nextDay(): Scenario {
		const currentDay = this.simplifiedDatetime.day
		const nextDay = currentDay === 30 ? 1 : currentDay + 1
		this.simplifiedDatetime.day = nextDay

		this.clearAndSettle()

		return this
	}

	nextMonth(resetDay: boolean = false): Scenario {
		const currentMonth = this.simplifiedDatetime.month
		const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1
		this.simplifiedDatetime.month = nextMonth

		if (resetDay) {
			this.simplifiedDatetime.day = 1
		}

		this.clearAndSettle()

		return this
	}

	clearAndSettle(): Scenario {
		Object.values(this.world.banks).forEach((bank: Bank) => {
			Object.values(bank.cashAccounts).forEach((cashAccount: CashAccount) => {
				const currentBalance = fromAmount(cashAccount.balance)
				const nextBalance = cashAccount.txs
					.map((tx: CashTx) => {
						const relativeAmount = computeAmount(bank, cashAccount, tx)

						return relativeAmount
					})
					.reduce((balance: number, amount: number) => balance + amount, currentBalance)

				cashAccount.settledTxs.push(...cashAccount.txs)

				cashAccount.txs = []

				cashAccount.balance = toAmount(nextBalance)
			})
		})

		return this
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

	createPersonCashAccount(
		bic: Bic,
		personName: PersonName,
		accountNumber: string,
		currency: Currency,
		balance: Amount
	): Scenario {
		const cashAccount: CashAccount = {
			bic,
			accountNumber,
			owner: personName,
			currency,
			balance,
			txs: [],
			settledTxs: [],
		}
		const bank: Bank = this.world.banks[bic]
		bank.cashAccounts[accountNumber] = cashAccount
		return this
	}

	createCompanyCashAccount(
		bic: Bic,
		companyName: CompanyName,
		accountNumber: string,
		currency: Currency,
		balance: Amount
	): Scenario {
		const cashAccount: CashAccount = {
			bic,
			accountNumber,
			owner: companyName,
			currency,
			balance,
			txs: [],
			settledTxs: [],
		}

		const bank: Bank = this.world.banks[bic]
		bank.cashAccounts[accountNumber] = cashAccount
		return this
	}

	createPayment(
		senderBank: Bic,
		receiverBank: Bic,
		orderingCustomerCashAccount: string,
		beneficiaryCustomerCashAccount: string,
		amount: Amount,
		currency: Currency
	): Scenario {
		const tx: CashTx = {
			txType: TxType.CreditTransfer,
			senderBank,
			orderingCustomerCashAccount,
			receiverBank,
			beneficiaryCustomerCashAccount,
			amount,
			currency,
		}

		const senderBankAccount: CashAccount = this.world.banks[senderBank].cashAccounts[
			orderingCustomerCashAccount
		]
		const receiverBankAccount: CashAccount = this.world.banks[receiverBank].cashAccounts[
			beneficiaryCustomerCashAccount
		]

		senderBankAccount.txs.push(tx)
		receiverBankAccount.txs.push(tx)

		return this
	}
}

export { Scenario }
