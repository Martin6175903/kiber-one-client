export enum EnumGroupCategory {
	YOUNGER = 'YOUNGER',
	MEDIUM = 'MEDIUM',
	ADULTS = 'ADULTS'
}

export interface IGroup {
	id?: string,
	title: string,
	ageCategory: EnumGroupCategory,
	yearOfGroup: number,
	dayOfStudy: string,
	timeLearning: string,
	assistant?: string
}