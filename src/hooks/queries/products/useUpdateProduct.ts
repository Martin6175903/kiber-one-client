import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '@/src/shared/types/product.types'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useUpdateProduct = () => {
	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()
	const {push} = useRouter()

	const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update product'],
		mutationFn: (data: IProduct) => productService.update(params.productId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['update product']
			})
			toast.success('Товар обновлён')
			push(PUBLIC_URL.products())
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