import { displayBanks } from './simple/scenario-displays'

// require('dotenv').config();
// import { createLogger } from './create-logger';
// import { toColor } from './to-color';
// import { fetchColors } from './fetch-colors';

// const logger = createLogger('ts-app');

// const port = process.env.PORT || 3000;
// const environment = process.env.ENVIRONMENT || 'local';

// logger.info('spc:started');

// fetchColors();

import { BobWorkdsForAlice } from './simple/narratives/BobWorkdsForAlice'

const scenario = BobWorkdsForAlice.setup()
console.info('Before:', displayBanks(scenario.world))
const executedScenario = BobWorkdsForAlice.run(scenario)
console.info('After:', displayBanks(executedScenario.world))
