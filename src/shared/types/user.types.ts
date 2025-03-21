import { IOrder } from '@/src/shared/types/order.types'

export interface IUser {
	id: string
	firstName: string
	lastName: string
	email: string
	orders: IOrder[]
	moderator: boolean
}