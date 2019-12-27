import { Scenario } from './simplified/Scenario'
import { displayBank, displayBanks } from './simplified/scenarioDisplays'

// require('dotenv').config();
// import { createLogger } from './create-logger';
// import { toColor } from './to-color';
// import { fetchColors } from './fetch-colors';

// const logger = createLogger('ts-app');

// const port = process.env.PORT || 3000;
// const environment = process.env.ENVIRONMENT || 'local';

// logger.info('spc:started');

// fetchColors();

const scenario = new Scenario('Blah')
	.createPerson('Alice')
	.createPerson('Bob')
	.createCompany('AncillaryGroceries', ['Alice'])
	.createBank('AcmeBank', 'AC22BANK')
	.createBank('BankyBank', 'BB33BANK')
	.createPersonCashAccount('AC22BANK', 'Alice', 'A0001')
	.createPersonCashAccount('AC22BANK', 'Bob', 'A0002')
	.createCompanyCashAccount('BB33BANK', 'AncillaryGroceries', 'B0001')

console.log('Welcome')
console.info(displayBanks(scenario.world))
