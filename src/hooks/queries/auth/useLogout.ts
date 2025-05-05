import { useMutation } from '@tanstack/react-query'
import { authService } from '@/src/services/auth/auth.service'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const useLogout = () => {
	const router = useRouter()

	const { mutate: logout, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return useMemo(
		() => ({
			logout,
			isPending
		}),
		[logout, isPending]
	)
}
