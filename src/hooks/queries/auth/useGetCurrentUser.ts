import { useQuery } from '@tanstack/react-query'
import { authService } from '@/src/services/auth/auth.service'
import { useMemo } from 'react'

export const useGetCurrentUser = () => {
	const {data: currentUser, isPending: isPendingUser} = useQuery({
		queryKey: ['get current user'],
		queryFn: () => authService.getCurrentUser(),
		refetchOnWindowFocus: false
	})

	return useMemo(() => ({
		currentUser, isPendingUser
	}), [currentUser, isPendingUser])
}