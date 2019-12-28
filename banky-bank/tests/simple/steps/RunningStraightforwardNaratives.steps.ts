import { defineFeature, loadFeature } from 'jest-cucumber'
import { BankyBankWorld, EntityType } from '../../../src/simple'
import { toPascalCasedTable } from './utils'
import { CustomerType } from '../../../src/simple/datamodel'

const feature = loadFeature('./tests/simple/features/RunningStraightforwardNaratives.feature')

defineFeature(feature, test => {
	test('Simple world where Bob is getting his salary', ({ given, when, then }) => {
		const bankyBankWorld = new BankyBankWorld(feature.title, { year: 20, month: 1, day: 1 })

		given('following actors are present:', table => {
			const actors = toPascalCasedTable(table)

			actors.forEach((actor: any) => {
				const { entityType, name, directors } = actor

				if (entityType.toUpperCase() === EntityType.Person) {
					bankyBankWorld.createPerson(name)
				} else if (entityType.toUpperCase() === EntityType.Company) {
					bankyBankWorld.createCompany(name, [directors])
				}
			})
		})

		given('following banks are present:', table => {
			const banks = toPascalCasedTable(table)

			banks.forEach(bank => {
				const { bankName, bic } = bank
				bankyBankWorld.createBank(bankName, bic)
			})
		})

		given('following cash bank accounts are present:', table => {
			const bankAccounts = toPascalCasedTable(table)
			bankAccounts.forEach(bankAccount => {
				const {
					entityType,
					bic,
					customerName,
					cashAccountNumber,
					currency,
					initialBalance,
				} = bankAccount

				bankyBankWorld.createCashAccount(
					entityType,
					bic,
					customerName,
					cashAccountNumber,
					currency,
					initialBalance
				)
			})
		})

		when('following payments are executed:', table => {
			const payments = toPascalCasedTable(table)

			payments.forEach(payment => {
				const {
					senderBic,
					receiverBic,
					orderingCashAccountNumber,
					beneficiaryCashAccountNumber,
					currency,
					amount,
					timetravel,
				} = payment

				bankyBankWorld.createPayment(
					senderBic,
					receiverBic,
					orderingCashAccountNumber,
					beneficiaryCashAccountNumber,
					currency,
					amount
				)

				if (timetravel === 'NextMonth') {
					bankyBankWorld.nextMonth()
				}
			})
		})

		then('we expect following balances:', table => {
			const reports = toPascalCasedTable(table)

			reports.forEach(report => {
				const { bic, cashAccountNumber, balance: expectedBalance } = report
				const actualBalance =
					bankyBankWorld.world.banks[bic].cashAccounts[cashAccountNumber].balance
				expect(actualBalance).toBe(expectedBalance)
			})
		})
	})
})
