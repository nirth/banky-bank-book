export type IsoDate = string

export type NationalIdentificationNumber = string
export type CompanyNumber = string
export type TaxIdentificationNumber = string
export type IdentificationNumber =
	| NationalIdentificationNumber
	| CompanyNumber
	| TaxIdentificationNumber
	| string

export type Amount = string
export type CountryCode = string

export enum PersonKind {
	NaturalPerson = 'NATURAL_PERSON',
	LegalPerson = 'LEGAL_PERSON',
}

export type NaturalPerson = {
	personKind: PersonKind.NaturalPerson
	name: string
	dateOfBirth: IsoDate
	naturalisedOn: IsoDate
	nationalIdentificationNumber: NationalIdentificationNumber
	country: CountryCode
}

export type Company = {
	personKind: PersonKind.LegalPerson
	name: string
	foundingDate: IsoDate
	companyNumber: IdentificationNumber
	taxIdentificationNumber: IdentificationNumber
	country: CountryCode
}

export type NotForProfitOrganisation = {
	personKind: PersonKind.LegalPerson
	name: string
	foundingDate: IsoDate
	registrationNumber: IdentificationNumber
	country: CountryCode
}

export type LegalPerson = Company | NotForProfitOrganisation

export enum CompanyDirectorStatus {
	Active = 'ACTIVE',
	Resigned = 'RESIGNED',
}

export type CompanyDirector = {
	director: NationalIdentificationNumber
	company: CompanyNumber
	appointmentDate: IsoDate
	resignationDate?: IsoDate
}

export type CompanyShareholder = {
	shareholder: IdentificationNumber
	company: CompanyNumber
	amount: Amount
}
