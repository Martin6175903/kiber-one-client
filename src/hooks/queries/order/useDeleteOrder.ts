import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useDeleteOrder = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteOrder, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete order'],
		mutationFn: ({ id }: { id: string }) => orderService.deleteOrder(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['delete order']
			})
			toast.success('Товар успешно удалён')
		},
		onError() {
			toast.error('Ошибка при удалении заказа')
		}
	})

	return useMemo(
		() => ({
			deleteOrder,
			isLoadingDelete
		}),
		[deleteOrder, isLoadingDelete]
	)
}
