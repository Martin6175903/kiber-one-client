import { useCard } from '@/src/hooks/useCard'
import { useActions } from '@/src/hooks/useActions'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useCheckOut = () => {
  const { items } = useCard()

  const { reset } = useActions()

  const router = useRouter()

  const { mutate: createOrder, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create order'],
    mutationFn: () =>
      orderService.place({
        items: items.map(item => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id
        }))
      }),
    onSuccess({data}){
      // router.push(data.confirmation.confirmation_url)
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