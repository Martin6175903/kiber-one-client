import { IProduct } from '@/src/shared/types/product.types'

export interface ICardItem {
	id: number
	product: IProduct
	quantity: number
	price: number
	size: string | undefined
}
