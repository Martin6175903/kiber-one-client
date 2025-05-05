import { useQuery } from '@tanstack/react-query'
import { userService } from '@/src/services/user.service'

export function useProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => userService.getProfile()
	})

	// if (!auth) throw new Error('Профайл не получен!')

	return { user, isLoading }
}
