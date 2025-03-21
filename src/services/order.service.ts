import { EnumOrderStatus, IPaymentResponse } from '@/src/shared/types/order.types'
import { axiosWithAuth } from '@/src/api/api.interceptors'
import { API_URL } from '@/src/config/api.config'

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
	}[]
}

class OrderService {
	async place(data: TypeData) {
		return axiosWithAuth<IPaymentResponse>({
			url: API_URL.orders('/place'),
			method: 'POST',
			data
		})
	}
}

export const orderService = new OrderService()