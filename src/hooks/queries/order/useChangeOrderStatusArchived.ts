import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import { IOrderStatus } from '@/src/shared/types/order.types'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useChangeOrderStatusArchived = () => {
  const queryClient = useQueryClient()

  const {mutate: changeOrderStatusArchived, isPending: isPendingStatusArchived} = useMutation({
    mutationKey: ['change status archived'],
    mutationFn: (id: string) => orderService.changeStatusArchived(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get orders']
      })
      toast.success('Заказ успешно добавлен в архив!')
    },
    onError() {
      toast.error('Ошибка при добавлении заказа в архив!')
    }
  })

  return useMemo(() => ({
    changeOrderStatusArchived, isPendingStatusArchived
  }), [changeOrderStatusArchived, isPendingStatusArchived])
}