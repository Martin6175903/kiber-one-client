import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (id: string) => productService.delete(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products']
			})
			toast.success('Товар удалён')
			push(PUBLIC_URL.admin('/products'))
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
