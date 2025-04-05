export interface IProduct {
	id?: string
	title: string
	description: string
	price: string | number
	isStock: boolean
	images: string[]
	size?: string[] | undefined
}

export interface IProductInput extends Omit<IProduct, 'id'> {}