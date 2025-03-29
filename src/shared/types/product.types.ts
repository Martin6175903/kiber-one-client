export interface IProduct {
	id?: string
	title: string
	description: string
	price: string | number
	images: string[]
	size?: string[] | undefined
}

export interface IProductInput extends Omit<IProduct, 'id'> {}