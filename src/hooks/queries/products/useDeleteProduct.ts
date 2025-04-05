import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useDeleteProduct = () => {
	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()
	const {push} = useRouter()

	const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: () => productService.delete(params.productId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['delete product']
			})
			toast.success('Товар удалён')
			push(PUBLIC_URL.products())
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