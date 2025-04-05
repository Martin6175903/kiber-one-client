import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import { IOrderStatus } from '@/src/shared/types/order.types'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useUpdateOrderStatus = () => {
  const params = useParams<{ orderId: string }>()
  const queryClient = useQueryClient()

  const {data: updateOrderStatus, isPending} = useMutation({
    mutationKey: ['update status order'],
    mutationFn: (data: IOrderStatus) => orderService.updateOrderStatus(params.orderId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['update status order']
      })
      toast.success('Статус заказа обновлён')
    },
    onError() {
      toast.error('Ошибка при обновлении статуса заказа')
    }
  })

  return useMemo(() => ({
    updateOrderStatus, isPending
  }), [updateOrderStatus, isPending])
}