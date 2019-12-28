import { CashTx, Bank, CashAccount, TxType, Amount } from './datamodel'

export const computeTxDirectionMetadata = (bank: Bank, cashAccount: CashAccount, tx: CashTx) => {
	const isCreditTransfer = tx.txType === TxType.CreditTransfer
	const isDirectDebit = tx.txType === TxType.DirectDebit
	const isIncoming =
		tx.receiverBank === bank.bic && tx.beneficiaryCustomerCashAccount === cashAccount.accountNumber

	return {
		isCreditTransfer,
		isDirectDebit,
		isIncoming,
	}
}

export const computeAmountDelta = (bank: Bank, cashAccount: CashAccount, tx: CashTx): number => {
	const { isCreditTransfer, isDirectDebit, isIncoming } = computeTxDirectionMetadata(
		bank,
		cashAccount,
		tx
	)

	const { amount } = tx

	const amountNumber = parseFloat(amount)
	if (isCreditTransfer && isIncoming) {
		return amountNumber
	} else if (isCreditTransfer && !isIncoming) {
		return -amountNumber
	} else if (isDirectDebit && isIncoming) {
		return -amountNumber
	} else if (isDirectDebit && !isIncoming) {
		return amountNumber
	} else {
		throw new Error(`Invalid CashTx: ${JSON.stringify(tx)}`)
	}
}

export const fromAmount = (amount: Amount): number => parseFloat(amount.split(',').join(''))
export const toAmount = (amountNumber: number): Amount => amountNumber.toLocaleString()
