import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthForm, IAuthResponse } from '@/src/shared/types/auth.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/src/services/auth.service'
import toast from 'react-hot-toast'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useAuthForm = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	const form = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const {mutate, isPending} = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main(data),
		onSuccess({ data }) {
			form.reset()
			queryClient.invalidateQueries({
				queryKey: ['get current user']
			})
			data.role === 'USER' ? router.replace(PUBLIC_URL['user-panel']('/')) : router.replace(PUBLIC_URL.admin('/'))
			toast.success('Успешная авторизация')
		},
		onError(error: any) {
			if (error.message) toast.error(error.message)
			else toast.error('Ошибка при авторизации')
		}
	})

	const onSubmit:SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return { onSubmit, form, isPending }
}