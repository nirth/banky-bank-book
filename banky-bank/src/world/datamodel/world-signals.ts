import {
	NaturalPerson,
	Company,
	CompanyDirector,
	CompanyShareholder,
	Human,
} from './world-entities'

export type HumanEmerged = {
	[dateAndName: string]: Human
}

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
