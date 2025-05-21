import { useCard } from '@/src/hooks/useCard'
import { useActions } from '@/src/hooks/useActions'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useCreateOrder = () => {
  const { items } = useCard()
  const queryClient = useQueryClient()

  const { reset } = useActions()

  const router = useRouter()

  const { mutate: createOrder, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create order'],
    mutationFn: () =>
      orderService.place({
        items: items.map(item => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id,
          size: item.size
        }))
      }),
    onSuccess(){
      queryClient.invalidateQueries({
        queryKey: ['get current user'],
      })
      toast.success('Заказ успешно оформлен!')
      router.push(PUBLIC_URL.thanks())
      reset()
    },
    onError() {
      toast.error('Ошибка при отправке заказа!')
    }
  })

  return useMemo(() => ({
    createOrder, isLoadingCreate
  }), [createOrder, isLoadingCreate])
}