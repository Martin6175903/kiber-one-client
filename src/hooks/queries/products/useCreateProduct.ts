import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '@/src/shared/types/product.types'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { API_URL } from '@/src/config/api.config'
import { useMemo } from 'react'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create product'],
		mutationFn: (data: IProduct) => productService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products']
			})
			toast.success('Товар создан')
		},
		onError() {
			toast.error('Ошибка при создании товара')
		}
	})

	return useMemo(
		() => ({
			createProduct,
			isLoadingCreate
		}),
		[createProduct, isLoadingCreate]
	)
}