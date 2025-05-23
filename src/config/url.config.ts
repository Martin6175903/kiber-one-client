export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: (url = '') => PUBLIC_URL.root(`/${url ? url : ''}`),
	auth: () => PUBLIC_URL.root(`/auth`),
	products: (id = '') => PUBLIC_URL.root(`/products/${id}`),
	product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
	thanks: () => PUBLIC_URL.root('/thanks'),
	order: () => PUBLIC_URL.root('/order'),

	'user-panel': () => PUBLIC_URL.root('/user-panel'),
	admin: (url = '') => PUBLIC_URL.root(`/admin${url ? url : ''}`)
}