export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	auth: (url = '') => API_URL.root(`/auth${url}`),
	users: (url = '') => API_URL.root(`/users${url}`),
	products: (url = '') => API_URL.root(`/products${url}`),
	orders: (url = '') => API_URL.root(`/orders${url}`),
	files: (url = '') => API_URL.root(`/files${url}`)
}