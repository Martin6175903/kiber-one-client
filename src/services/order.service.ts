import { EnumOrderStatus, IOrder, IOrderStatus, IPaymentResponse } from '@/src/shared/types/order.types'
import { axiosWithAuth } from '@/src/api/api.interceptors'
import { API_URL } from '@/src/config/api.config'

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
		size: string | undefined
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
	
	async updateOrderStatus(data: IOrderStatus) {
		const {data: updatedOrderStatus} = await  axiosWithAuth<IOrderStatus>({
			url: API_URL.orders(`/status/${data.id}`),
			method: 'POST',
			data: { status: data.status }
		})

		return updatedOrderStatus
	}

	async changeStatusCancelled(id: string) {
		return await  axiosWithAuth({
			url: API_URL.orders(`/status/cancelled/${id}`),
			method: 'PATCH'
		})
	}

	async changeStatusArchived(id: string) {
		return await  axiosWithAuth({
			url: API_URL.orders(`/status/archived/${id}`),
			method: 'PATCH'
		})
	}

	async deleteOrder(id: string) {
		return axiosWithAuth<IOrder>({
			url: API_URL.orders(`/${id}`),
			method: 'DELETE'
		})
	}
}

export const orderService = new OrderService()