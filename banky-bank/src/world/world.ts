import { WorldState } from './datamodel/world-entities'
import { create } from 'domain'
import { WorldError } from './WorldError'

const createInitialWorldState = (): WorldState => ({
	humans: {},
	naturalPersons: {},
	companies: {},
})

const validateWorldState = (worldState: WorldState): Boolean => {
	return typeof worldState === 'object' && worldState !== null
}

export class World {
	_worldState: WorldState

	constructor(initialWorldState?: WorldState) {
		if (initialWorldState === undefined) {
			this._worldState = createInitialWorldState()
		} else {
			if (validateWorldState(initialWorldState)) {
				this._worldState = initialWorldState
			} else {
				throw new WorldError('Invalid Initial World State')
			}
		}
	}
}
