### Code Style

#### Exports

If file exports a single thing, such as single function, single class, or single type, it should be named as this thing, for example:

```javascript
// filename: Person.ts

class Person {}

export { Person }

// filename: tabulate.ts

const createTabs = (numTabs: number) =>
	Array.from({ length: numTabs })
		.map(() => '\t')
		.join('')

export const tabulate = (row: string, numTabs = 0) => `${createTabs(numTabs)} ${row}`

// createTabs effectively a private function for the tabulate.ts module.
```

If file exports multiple items, it should be named as if it’s an npm module, and be hyphenated, for example:

```javascript
// filename: math-operations.ts

export const plus = (a, b) => a + b
export const minus = (a, b) => a - b
```

Default exports are strongly discouraged, default exports do not enforce control for the proper naming, thus can be dangerous. Check this article for mode details: https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad

### Nomenclature

- BIC (`Bic`, or `bic`): Bank Identification Code.
- SWIFT (`Swift`, `swift`):
- SWIFT Code (`SwiftCode`, `swiftCode`):
- ISO 3166: Standard defines country names. Banky Bank utilises ISO 3166 Alpha-2 Code that uses two letters for a country, such as US for United States, GB for United Kingdom, FR for France, DE for Germany, etc.
- ISO 4217: Standard that defines active currencies. https://en.wikipedia.org/wiki/ISO_4217#Unofficial_currency_codes
