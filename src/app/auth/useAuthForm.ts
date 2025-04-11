import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthForm } from '@/src/shared/types/auth.types'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/src/services/auth/auth.service'
import toast from 'react-hot-toast'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useAuthForm = (isReg: boolean) => {
	const router = useRouter()

	const form = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const {mutate, isPending} = useMutation({
		mutationKey: ['auth auth'],
		mutationFn: (data: IAuthForm) => authService.main(isReg ? 'register' : 'login', data),
		onSuccess() {
			form.reset()
			toast.success('Успешная авторизация')
			router.replace(PUBLIC_URL.home())
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