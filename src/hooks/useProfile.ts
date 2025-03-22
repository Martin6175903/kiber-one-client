import { useQuery } from '@tanstack/react-query'
import { userService } from '@/src/services/user.service'

export function getProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile()
	})

	return {user, isLoading}
}