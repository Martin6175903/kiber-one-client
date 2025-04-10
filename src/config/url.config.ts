export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root(`/`),
	auth: () => PUBLIC_URL.root(`/auth`),
	products: (id = '') => PUBLIC_URL.root(`/products/${id}`),
	product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
	thanks: () => PUBLIC_URL.root('/thanks'),
	order: () => PUBLIC_URL.root('/order')
}