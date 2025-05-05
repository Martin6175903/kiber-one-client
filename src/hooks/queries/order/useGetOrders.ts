import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import { useMemo } from 'react'

export const useGetOrders = () => {
	const { data: orders, isLoading } = useQuery({
		queryKey: ['get orders'],
		queryFn: () => orderService.getOrders()
	})

	return useMemo(
		() => ({
			orders,
			isLoading
		}),
		[orders, isLoading]
	)
}
