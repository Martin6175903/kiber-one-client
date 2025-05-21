import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import { useMemo } from 'react'

export const useGetProductsAggregation = () => {
	const {data: productsAggregation, isLoading: isLoadingProductsAggregation} = useQuery({
		queryKey: ['get products with aggregation'],
		queryFn: () => orderService.getProductsAggregation()
	})

	return useMemo(() => ({
		productsAggregation, isLoadingProductsAggregation
	}), [productsAggregation, isLoadingProductsAggregation])
}