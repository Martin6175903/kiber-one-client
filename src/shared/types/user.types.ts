import { IOrder } from '@/src/shared/types/order.types'

export type TypeUserRole = "USER" | "MODERATOR"

export interface IUser {
	id: string
	firstName: string
	lastName: string
	role: TypeUserRole
	phoneNumber: string
	password: string
	quantityMoney?: number
	yearOfBirth?: Date
	startLearning?: Date
	numberCard?: string
	orders: IOrder[]
	groupId?: string
}

export interface IUserInput extends Omit<IUser, 'id' | 'orders'>{}