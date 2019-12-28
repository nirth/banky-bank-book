import {
	Amount,
	Bank,
	Bic,
	CashAccount,
	CashTx,
	Company,
	CompanyName,
	Currency,
	EntityName,
	Person,
	PersonName,
	World,
	SimplifiedDatetime,
	TxType,
	Datetime,
	CashTxStatus,
	CustomerName,
	EntityType,
	CustomerType,
} from './datamodel'
import * as engine from './engine'
import { computeAmountDelta, fromAmount, toAmount } from './utils'

class BankyBankWorld {
	world: World
	simplifiedDatetime: SimplifiedDatetime = { year: -1, month: -1, day: -1 }

	constructor(name: string, datetime: SimplifiedDatetime) {
		this.world = { name, banks: {}, persons: {}, companies: {} }
		this.setDatetime(datetime)
	}

	setDatetime(datetime: SimplifiedDatetime): BankyBankWorld {
		this.simplifiedDatetime = datetime
		return this
	}

	nextDay(): BankyBankWorld {
		const currentDay = this.simplifiedDatetime.day
		const nextDay = currentDay === 30 ? 1 : currentDay + 1
		this.simplifiedDatetime.day = nextDay

		this.clearAndSettle()

		return this
	}

	nextMonth(resetDay: boolean = false): BankyBankWorld {
		const currentMonth = this.simplifiedDatetime.month
		const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1
		this.simplifiedDatetime.month = nextMonth

		if (resetDay) {
			this.simplifiedDatetime.day = 1
		}

		this.clearAndSettle()

		return this
	}

	get currentDatetime(): Datetime {
		const { year, month, day } = this.simplifiedDatetime
		return year * month * day
	}

	clearAndSettle(): BankyBankWorld {
		Object.values(this.world.banks).forEach((bank: Bank) => {
			Object.values(bank.cashAccounts).forEach((cashAccount: CashAccount) => {
				const currentBalance = fromAmount(cashAccount.balance)
				const nextBalance = cashAccount.txs
					.map((tx: CashTx) => {
						const relativeAmount = computeAmountDelta(bank, cashAccount, tx)

						return relativeAmount
					})
					.reduce((balance: number, amount: number) => balance + amount, currentBalance)

				const settledTxs: CashTx[] = cashAccount.txs.map((tx: CashTx) => ({
					...tx,
					status: CashTxStatus.Settled,
					settledAt: this.currentDatetime,
				}))

				cashAccount.settledTxs.push(...settledTxs)

				cashAccount.txs = []

				cashAccount.balance = toAmount(nextBalance)
			})
		})

		return this
	}

	createBank(name: string, bic: Bic): BankyBankWorld {
		const bank: Bank = { name, bic, cashAccounts: {} }
		this.world.banks[bic] = bank
		return this
	}

	createPerson(name: PersonName): BankyBankWorld {
		this.world.persons[name] = engine.createPerson(name)
		return this
	}

	createCompany(name: CompanyName, directors: EntityName[]): BankyBankWorld {
		this.world.companies[name] = engine.createCompany(name, directors)
		return this
	}

	createCashAccount(
		customerType: CustomerType,
		bic: Bic,
		customerName: CustomerName,
		accountNumber: string,
		currency: Currency,
		initialBalance: Amount
	): BankyBankWorld {
		const bank: Bank = this.world.banks[bic]
		bank.cashAccounts[accountNumber] = engine.createCashAccount(
			customerType,
			bic,
			customerName,
			accountNumber,
			currency,
			initialBalance
		)
		return this
	}

	createPayment(
		senderBank: Bic,
		receiverBank: Bic,
		orderingCustomerCashAccount: string,
		beneficiaryCustomerCashAccount: string,
		currency: Currency,
		amount: Amount
	): BankyBankWorld {
		const tx: CashTx = {
			status: CashTxStatus.Initiated,
			txType: TxType.CreditTransfer,
			senderBank,
			orderingCustomerCashAccount,
			receiverBank,
			beneficiaryCustomerCashAccount,
			amount,
			currency,
			initiatedAt: this.currentDatetime,
			executedAt: this.currentDatetime,
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

export { BankyBankWorld }
