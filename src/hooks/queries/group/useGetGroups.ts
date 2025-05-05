import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { groupService } from '@/src/services/group.service'

export const useGetGroups = () => {
	const { data: groups, isLoading } = useQuery({
		queryKey: ['get groups'],
		queryFn: () => groupService.getGroups()
	})

	return useMemo(
		() => ({
			groups,
			isLoading
		}),
		[groups, isLoading]
	)
}
