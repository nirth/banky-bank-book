import { Scenario } from '../Scenario'

const scenario = new Scenario('Blah')
	.createPerson('Alice')
	.createPerson('Bob')
	.createCompany('AncillaryGroceries', ['Alice'])
	.createBank('AcmeBank', 'AC22BANK')
	.createBank('BankyBank', 'BB33BANK')
	.createPersonCashAccount('AC22BANK', 'Alice', 'A0001')
	.createPersonCashAccount('AC22BANK', 'Bob', 'A0002')
	.createCompanyCashAccount('BB33BANK', 'AncillaryGroceries', 'B0001')
