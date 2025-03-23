import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '@/src/shared/types/product.types'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { API_URL } from '@/src/config/api.config'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'

export const useCreateProduct = () => {
	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update product'],
		mutationFn: (data: IProduct) => productService.update(params.productId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['update product']
			})
			toast.success('Товар обновлён')
		},
		onError() {
			toast.error('Ошибка при обновлении товара')
		}
	})

	return useMemo(
		() => ({
			updateProduct,
			isLoadingUpdate
		}),
		[updateProduct, isLoadingUpdate]
	)
}