import { Bank, World, Bic, CashBankAccount } from './datamodel'

export const displayCashAccount = (
	world: World,
	bic: Bic,
	accountNumber: string,
	numTabs = 0
): string => {
	const bank: Bank = world.banks[bic]
	const cashAccount = bank.cashAccounts[accountNumber]

	return `CashAccount: bic: ${cashAccount.bic} account number: ${cashAccount.accountNumber}, owner: ${cashAccount.owner}`
}

export const displayBank = (world: World, bic: Bic, numTabs = 0): string => {
	const bank: Bank = world.banks[bic]
	const cashAccountsString = Object.values(bank.cashAccounts)
		.map((cashAccount: CashBankAccount) => {
			const { bic, accountNumber } = cashAccount
			return displayCashAccount(world, bic, accountNumber, numTabs + 1)
		})
		.map(formatAndTabluateRow(numTabs))
	return `Bank name: ${bank.name} bic: ${bank.bic}\n${cashAccountsString.join('\n')}
  `
}

export const displayBanks = (world: World, numTabs = 0): string => {
	const bankStrings = Object.values(world.banks)
		.map((bank: Bank) => {
			const { bic } = bank
			return displayBank(world, bic, numTabs + 1)
		})
		.map(formatAndTabluateRow(numTabs))

	return `Banks:\n${bankStrings.join('\n')}`
}

const formatAndTabluateRow = (numTabs: number) => (row: string) => {
	const tabs = Array.from({ length: numTabs }).map(() => ' ')
	return `${tabs}- ${row}`
}
