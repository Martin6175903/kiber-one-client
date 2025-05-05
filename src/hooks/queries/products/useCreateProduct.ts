import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IProduct, IProductInput } from '@/src/shared/types/product.types'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create product'],
		mutationFn: (data: IProductInput) => productService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products']
			})
			toast.success('Товар создан')
			push(PUBLIC_URL.admin('/products'))
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
