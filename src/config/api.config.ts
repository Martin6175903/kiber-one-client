export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	auth: (url = '') => API_URL.root(`/auth${url}`),
	users: (url = '') => API_URL.root(`/users${url}`),
	products: (url = '') => API_URL.root(`/products${url}`),
	orders: (url = '') => API_URL.root(`/orders${url}`),
	files: (url = '') => API_URL.root(`/files${url}`),
	city: (url = '') => API_URL.root(`/city${url}`),
	group: (url = '') => API_URL.root(`/group${url}`),
	transaction: (url = '') => API_URL.root(`/transaction${url}`)
}