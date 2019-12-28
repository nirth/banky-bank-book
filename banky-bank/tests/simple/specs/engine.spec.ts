import { createPerson } from '../../../src/simple/engine'

describe('Engine can create entities and should', () => {
	it('be able to create a person', () => {
		const ALICE = 'Alice'
		const BOB = 'Bob'
		const alice = createPerson(ALICE)
		const bob = createPerson(BOB)

		expect(alice.name).toBe(ALICE)
		expect(bob.name).toBe(BOB)
	})
})
