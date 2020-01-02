// import { Bank, FinancialInstitution, Bic, FinancialMessage, World } from './datamodel'

// class FinancialNetwork {
// 	private registeredBics: Bic[]
// 	private world: World

// 	constructor(world: World) {
// 		this.world = world
// 		this.registeredBics = []
// 	}

// 	addBank(bic: Bic) {
// 		if (!this.registeredBics.includes(bic)) {
// 			this.registeredBics.push(bic)
// 		}
// 	}

// 	sendMessage(senderBic: Bic, receiversBics: Bic[], message: FinancialMessage) {
// 		const hasReceiversBics = Array.isArray(receiversBics) && receiversBics.length > 0
// 		const filteredRreceiversBics = hasReceiversBics
// 			? receiversBics
// 			: receiversBics.filter((bic: Bic) => bic !== senderBic)

// 		filteredRreceiversBics.map((bic: Bic): Bank => world.banks[bic]).forEach((bank:Bank) => {
// 			 bank
// 		})
// 	}
// }
