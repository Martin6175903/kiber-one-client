import { EnumOrderStatus, IOrder, IOrderStatus, IPaymentResponse } from '@/src/shared/types/order.types'
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

	async getOrders() {
		const { data } = await axiosWithAuth<IOrder[]>({
			url: API_URL.orders(),
			method: "GET"
		})
		return data
	}
	
	async updateOrderStatus(id: string, data: IOrderStatus) {
		return axiosWithAuth<IOrder>({
			url: API_URL.orders(`status/${id}`),
			method: 'POST',
			data
		})
	}
}

export const orderService = new OrderService()