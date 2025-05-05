import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cityService } from '@/src/services/city.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useUpdateCity = () => {
	const queryClient = useQueryClient()

	const { mutate: updateCity, isPending: isUpdatedCity } = useMutation({
		mutationKey: ['update city'],
		mutationFn: (data: ICity) => cityService.updateCite(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get cities']
			})
			toast.success('Раздел кабинета "Город" обновлён')
		},
		onError() {
			toast.error('Ошибка при обновлении раздела "Город"')
		}
	})

	return useMemo(
		() => ({
			updateCity,
			isUpdatedCity
		}),
		[updateCity, isUpdatedCity]
	)
}
