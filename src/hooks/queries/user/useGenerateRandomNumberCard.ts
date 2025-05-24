import { useQuery } from '@tanstack/react-query'
import { userService } from '@/src/services/user.service'
import { useMemo } from 'react'

export const useGenerateRandomNumberCard = () => {
	const { data: randomNumberCard, isLoading: isLoadingRandomNumberCard, refetch } = useQuery({
		queryKey: ['generate random number card'],
		queryFn: () => userService.generateRandomNumberCard()
	})

	return useMemo(() => ({
		randomNumberCard, isLoadingRandomNumberCard, refetch
	}), [randomNumberCard, isLoadingRandomNumberCard, refetch])
}