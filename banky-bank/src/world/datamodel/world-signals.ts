import { NaturalPerson, Company, CompanyDirector, CompanyShareholder } from './world-entities'

export type NaturalPersonRegistered = {
	[countryAndNin: string]: NaturalPerson
}

export type CompanyFounded = {
	[countryAndCompanyNumber: string]: Company
}

export type CompanyDirectorAppointed = {
	[dateAndCountryAndNinAndCompanyNumber: string]: CompanyDirector
}

export type CompanyDirectorResigned = {
	[dateAndCountryAndNinAndCompanyNumber: string]: CompanyDirector
}

export type CompanySharesBought = {
	[dateAndCountryAndNinAndCompanyNumber: string]: CompanyShareholder
}

export type CompanySharesSold = {}
