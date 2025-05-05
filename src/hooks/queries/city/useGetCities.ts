import { useQuery, useQueryClient } from '@tanstack/react-query'
import { cityService } from '@/src/services/city.service'
import { useMemo } from 'react'

export const useGetCities = () => {
	const { data: cities, isLoading: isCitiesLoading } = useQuery({
		queryKey: ['get cities'],
		queryFn: () => cityService.getCities()
	})

	return useMemo(
		() => ({
			cities,
			isCitiesLoading
		}),
		[cities, isCitiesLoading]
	)
}
