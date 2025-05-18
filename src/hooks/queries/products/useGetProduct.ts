import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '@/src/shared/types/product.types'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'

export const useGetProduct = () => {
	const { id } = useParams<{ id: string }>()
	const { data: product, isLoading: isLoadingProduct } = useQuery({
		queryKey: ['get product by id'],
		queryFn: () => productService.getById(id)
	})

	return useMemo(
		() => ({
			product,
			isLoadingProduct
		}),
		[product, isLoadingProduct]
	)
}