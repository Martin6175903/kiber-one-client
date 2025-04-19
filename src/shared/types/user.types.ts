import { IOrder } from '@/src/shared/types/order.types'

export enum EnumUserRole {
	USER,
	MODERATOR
}

export interface IUser {
	id: string
	firstName: string
	lastName: string
	role: EnumUserRole
	phoneNumber: string
	password: string
	quantityMoney?: number
	yearOfBirth?: Date
	startLearning?: Date
	numberCard?: Number
	orders: IOrder[]
	groupId?: string
}

export interface IUserInput extends Omit<IUser, 'id' | 'orders'>{}