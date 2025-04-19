import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/src/services/product.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'
import { userService } from '@/src/services/user.service'

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	const {push} = useRouter()

	const { mutate: deleteUser, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: string) => userService.deleteUser(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get users']
			})
			toast.success('Пользователь успешно удалён')
		},
		onError() {
			toast.error('Ошибка при удалении пользователя')
		}
	})

	return useMemo(
		() => ({
			deleteUser,
			isLoadingDelete
		}),
		[deleteUser, isLoadingDelete]
	)
}