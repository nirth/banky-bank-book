import { BankyBankWorld } from '../BankyBankWorld'
import { Currency, CustomerType } from '../datamodel'

const setup = (): BankyBankWorld =>
	new BankyBankWorld('Bob’s Life', { year: 20, month: 1, day: 1 })
		.createPerson('Alice')
		.createPerson('Bob')
		.createCompany('AncillaryGroceries', ['Alice'])
		.createBank('AcmeBank', 'AC22BANK')
		.createBank('BankyBank', 'BB33BANK')
		.createCashAccount(CustomerType.Person, 'AC22BANK', 'Alice', 'A0001', Currency.Gbp, '0.00')
		.createCashAccount(CustomerType.Person, 'AC22BANK', 'Bob', 'A0002', Currency.Gbp, '0.00')
		.createCashAccount(
			CustomerType.Company,
			'BB33BANK',
			'AncillaryGroceries',
			'B0001',
			Currency.Gbp,
			'150,000.00'
		)

const run = (scenario: BankyBankWorld): BankyBankWorld =>
	scenario
		.setDatetime({ year: 20, month: 1, day: 1 })
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')
		.nextMonth()
		.createPayment('BB33BANK', 'AC22BANK', 'B0001', 'A0002', Currency.Gbp, '3000.00')

export const BobWorkdsForAlice = {
	setup,
	run,
}
