const symbols = '0123456789abcdefghijklmnopqrstuvwxyz-–— '

const tokenizeSymbol = (inputSymbol: string): string => {
	if (symbols.includes(inputSymbol)) {
		return symbols.indexOf(inputSymbol).toString(32)
	} else {
		return (31).toString(32)
	}
}

export const tokenizeString = (inputString: string, prefix: string = ''): string => {
	const lowerCasedInputString = inputString.toLowerCase()
	const pseudoRandomDeveloperFriendlyToken = lowerCasedInputString
		.split('')
		.map(tokenizeSymbol)
		.join()

	return prefix + pseudoRandomDeveloperFriendlyToken
}
