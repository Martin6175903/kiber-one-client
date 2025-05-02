import { IOrder } from '@/src/shared/types/order.types'
import { IGroup } from './group.types.js'

export type TypeUserRole = "USER" | "MODERATOR"

export interface IUser {
	id: string
	name: string
	role: TypeUserRole
	phoneNumber: string
	password: string
	quantityMoney?: number
	numberCard?: string
	orders: IOrder[]
	groupId?: string
	group?: IGroup
}

export interface IUserInput extends Omit<IUser, 'id' | 'orders'>{}