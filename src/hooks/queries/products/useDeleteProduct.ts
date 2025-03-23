import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '@/src/shared/types/product.types'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { API_URL } from '@/src/config/api.config'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'

export const useDeleteProduct = () => {
	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()

	const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (data: IProduct) => productService.delete(params.productId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['delete product']
			})
			toast.success('Товар удалён')
		},
		onError() {
			toast.error('Ошибка при удалении товара')
		}
	})

	return useMemo(
		() => ({
			deleteProduct,
			isLoadingDelete
		}),
		[deleteProduct, isLoadingDelete]
	)
}