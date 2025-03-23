import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '@/src/shared/types/product.types'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useGetProducts = () => {
	const { data: products, isLoading } = useQuery({
		queryKey: ['get products'],
		queryFn: () => productService.getAll()
	})

	return useMemo(
		() => ({
			products,
			isLoading
		}),
		[products, isLoading]
	)
}