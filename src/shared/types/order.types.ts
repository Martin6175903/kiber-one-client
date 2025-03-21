import { IUser } from '@/src/shared/types/user.types'
import { ICardItem } from '@/src/shared/types/card.types'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	FRAMED = 'FRAMED'
}

export interface IOrder {
	id: string
	createdAt: string
	items: ICardItem[]
	status: EnumOrderStatus
	user: IUser
	total: number
}

export interface IPaymentResponse {
	id: string,
	status: string
	created_at: Date
}