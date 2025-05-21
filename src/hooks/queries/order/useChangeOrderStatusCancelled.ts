import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import { IOrderStatus } from '@/src/shared/types/order.types'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useChangeOrderStatusCancelled = () => {
  const queryClient = useQueryClient()

  const {mutate: changeOrderStatusCancelled, isPending: isPendingStatusCancelled} = useMutation({
    mutationKey: ['change status cancelled'],
    mutationFn: (id: string) => orderService.changeStatusCancelled(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get orders']
      })
      toast.success('Заказ успешно отменён!')
    },
    onError() {
      toast.error('Ошибка при отмене заказа!')
    }
  })

  return useMemo(() => ({
    changeOrderStatusCancelled, isPendingStatusCancelled
  }), [changeOrderStatusCancelled, isPendingStatusCancelled])
}