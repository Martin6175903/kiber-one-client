import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cityService } from '@/src/services/city.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useCreateCity = () => {
  const queryClient = useQueryClient()

  const {mutate: createCity, isPending: isCreatedCity} = useMutation({
    mutationKey: ['create city'],
    mutationFn: (data: ICity) => cityService.createCity(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['create city']
      })
      toast.success('Раздел кабинета "Город" создан')
    },
    onError() {
      toast.error('Ошибка при создании раздела "Город"')
    }
  })

  return useMemo(() => ({
    createCity, isCreatedCity
  }), [createCity, isCreatedCity])
}