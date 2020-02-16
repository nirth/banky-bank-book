import { defineFeature, loadFeature } from 'jest-cucumber'
import { toPascalCasedTable } from './utils'

const feature = loadFeature('./tests/features/NaturalPersons.feature')

const createHumans = (humans: any[]) => {
	console.log('createHumans', 'humans:', humans)
}

const createNaturalPersons = (naturalPersons: any[]) => {
	console.log('createNaturalPersons', 'naturalPersons:', naturalPersons)
}

const createLegalPersons = (legalPersons: any[]) => {
	console.log('createLegalPersons', 'legalPersons:', legalPersons)
}
const createDirectors = (directors: any[]) => {
	console.log('createDirectors', 'directors:', directors)
}
const createShareholders = (shareholders: any[]) => {
	console.log('createShareholders', 'shareholders:', shareholders)
}

defineFeature(feature, test => {
	test('Life of Alice the Entrepreneur', ({ given, when, then }) => {
		given('Alice is a Human with Birth Certificate', table => {
			const humans = toPascalCasedTable(table)
			createHumans(humans)
		})

		given(
			'Alice received her National Identification Number in UK, and later in Germany after she moved there',
			table => {
				const naturalPersons = toPascalCasedTable(table)
				createNaturalPersons(naturalPersons)
			}
		)

		given(
			'Alice founded a Limited Company AcmeCorp in Germany against her German Identification Documents',
			table => {
				const limitedCompanies = toPascalCasedTable(table)
				createLegalPersons(limitedCompanies)
			}
		)

		given('Alice became director of German Limited Company as a founder', table => {
			const directors = toPascalCasedTable(table)
			createDirectors(directors)
		})

		given('Alice became a shareholder (sole) by default of German Limited Company', table => {
			const shareholders = toPascalCasedTable(table)
			createShareholders(shareholders)
		})

		given(
			'Alice founded a branch of AcmeCorp in UK with her UK Identification Documents a year later',
			table => {
				const limitedCompanies = toPascalCasedTable(table)
				createLegalPersons(limitedCompanies)
			}
		)

		given('Alice became director of UK Branch as a founder', table => {
			const directors = toPascalCasedTable(table)
			createDirectors(directors)
		})

		given('Shareholders of UK Branch look like this', table => {
			const shareholders = toPascalCasedTable(table)
			createShareholders(shareholders)
		})

		given(
			'Alice founded Branches in US, Russia, and France against her UK and German identification',
			table => {
				const limitedCompanies = toPascalCasedTable(table)
				createLegalPersons(limitedCompanies)
			}
		)

		given('Alice became director of branches in US, Russia, and France as a founder', table => {
			const directors = toPascalCasedTable(table)
			createDirectors(directors)
		})

		given(
			'With following shareholder structure for the branches in US, Russia, and France',
			table => {
				const shareholders = toPascalCasedTable(table)
				createShareholders(shareholders)
			}
		)

		given(
			'Alice founded a Not for Profit in UK and Russia, to help children get access to crude oil',
			table => {
				const notForProfits = toPascalCasedTable(table)
				createLegalPersons(notForProfits)
			}
		)

		given(
			'With following shareholder structure for the non profits, after she invited some large corporations',
			table => {
				const shareholders = toPascalCasedTable(table)
				createShareholders(shareholders)
			}
		)

		when('her life is played out', () => {
			console.log('when!')
		})

		then('we do something', () => {
			expect(false).toBe(false)
		})
	})
})
