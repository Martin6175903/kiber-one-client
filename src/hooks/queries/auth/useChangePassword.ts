import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserContext } from '@/src/providers/user.context'
import { authService } from '@/src/services/auth.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useChangePassword = () => {
	const queryClient = useQueryClient()
	const {user} = useUserContext()

	const { mutate: changePassword, isPending: isPendingChangePassword } = useMutation({
		mutationKey: ['change password'],
		mutationFn: (password: string) => authService.changePassword(password, user?.id!),
		onSuccess: () => {
			toast.success('Пароль успешно изменён.')
		},
		onError: () => {
			toast.error('Не удалось изменить пароль.')
		}
	})

	return useMemo(() => ({
		changePassword, isPendingChangePassword
	}), [changePassword, isPendingChangePassword])
}