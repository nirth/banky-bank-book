import { Scenario } from './simplified/Scenario'
import { displayBank, displayBanks } from './simplified/scenario-displays'

// require('dotenv').config();
// import { createLogger } from './create-logger';
// import { toColor } from './to-color';
// import { fetchColors } from './fetch-colors';

// const logger = createLogger('ts-app');

// const port = process.env.PORT || 3000;
// const environment = process.env.ENVIRONMENT || 'local';

// logger.info('spc:started');

// fetchColors();

import { setupScenario, runScenario } from './simplified/scenarios/bob-works-for-alice'

const scenario = setupScenario()
console.info('Before:', displayBanks(scenario.world))
const executedScenario = runScenario(scenario)
console.info('After:', displayBanks(executedScenario.world))
