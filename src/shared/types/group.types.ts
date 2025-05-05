export enum EnumGroupCategory {
	YOUNGER = 'YOUNGER',
	MEDIUM = 'MEDIUM',
	ADULTS = 'ADULTS'
}

export interface IGroup {
	id?: string
	title: string
	ageCategory: EnumGroupCategory
	yearOfGroup: number
	dayOfStudy: string
	startTimeLearning: string
	endTimeLearning: string
	assistant?: string
	membersCount?: number
}

export interface IGroupInput {
	id?: string
	title: string
	ageCategory: EnumGroupCategory
	yearOfGroup: number
	dayOfStudy: string
	startTimeLearning: string
	endTimeLearning: string
	assistant?: string
	membersCount?: number
}
