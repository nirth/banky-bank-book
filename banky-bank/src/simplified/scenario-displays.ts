import { Bank, World, Bic, CashAccount, CashTx } from './datamodel'

export const displayTx = (tx: CashTx): string => {
	return `Transaction from: ${tx.senderBank} ${tx.orderingCustomerCashAccount} to: ${tx.receiverBank} ${tx.beneficiaryCustomerCashAccount} amount: ${tx.amount}${tx.currency}`
}

export const displayCashAccount = (
	world: World,
	bic: Bic,
	accountNumber: string,
	numTabs = 0
): string => {
	const bank: Bank = world.banks[bic]
	const cashAccount = bank.cashAccounts[accountNumber]
	const txsString = cashAccount.txs
		.map(displayTx)
		.map(formatAndTabluateRow(numTabs + 1))
		.join('\n')

	return `CashAccount: bic: ${cashAccount.bic} account number: ${cashAccount.accountNumber}, owner: ${cashAccount.owner}\n${txsString} balance: ${cashAccount.balance}`
}

export const displayBank = (world: World, bic: Bic, numTabs = 0): string => {
	const bank: Bank = world.banks[bic]
	const cashAccountsString = Object.values(bank.cashAccounts)
		.map((cashAccount: CashAccount) => {
			const { bic, accountNumber } = cashAccount
			return displayCashAccount(world, bic, accountNumber, numTabs + 1)
		})
		.map(formatAndTabluateRow(numTabs))
		.join('\n')
	return `Bank name: ${bank.name} bic: ${bank.bic}\n${cashAccountsString}
  `
}

export const displayBanks = (world: World, numTabs = 0): string => {
	const bankStrings = Object.values(world.banks)
		.map((bank: Bank) => {
			const { bic } = bank
			return displayBank(world, bic, numTabs + 1)
		})
		.map(formatAndTabluateRow(numTabs))
		.join('\n')

	return `Banks:\n${bankStrings}`
}

const formatAndTabluateRow = (numTabs: number) => (row: string) => {
	const tabs = Array.from({ length: numTabs })
		.map(() => ' ')
		.join('')
	return `${tabs}- ${row}`
}
