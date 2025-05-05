import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { IUser, IUserInput } from '@/src/shared/types/user.types'
import { userService } from '@/src/services/user.service'
import toast from 'react-hot-toast'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useMemo } from 'react'

export const useUpdateUser = (id: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutate: updateUser, isPending: isUpdateUser } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: IUserInput) => userService.updateUser(data, id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get users']
			})
			toast.success('Пользователь успешно изменён!')
			router.push(PUBLIC_URL.admin('/users'))
		},
		onError() {
			toast.error('Ошибка при изменении пользователя!')
		}
	})

	return useMemo(
		() => ({
			updateUser,
			isUpdateUser
		}),
		[updateUser, isUpdateUser]
	)
}
