export const EnumTypeTransaction = {
	BONUS: 'BONUS',
	PURCHASE: 'PURCHASE'
} as const

export type EnumTypeTransaction =
	(typeof EnumTypeTransaction)[keyof typeof EnumTypeTransaction]

export interface ITransaction {
	id?: string
	type: EnumTypeTransaction
	description: string
	quantityMoney: number
	remains: number
	userId: string
	createdAt: Date
}

export interface ITransactionInput
	extends Omit<ITransaction, 'remains' | 'userId' | 'createdAt'> {}

export interface ITransactionDelete {
	type: EnumTypeTransaction
	quantityMoney: number
	id: string
	userId: string
}
