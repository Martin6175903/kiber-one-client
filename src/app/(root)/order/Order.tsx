'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { saveTokenStorage } from '@/src/services/auth/auth-token.service'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/src/services/auth/auth.service'
import { useProfile } from '@/src/hooks/useProfile'
import { Button } from '@/src/components/ui/Button'
import { LogOut } from 'lucide-react'
import { useGetOrders } from '@/src/hooks/queries/order/useGetOrders'
import { useCard } from '@/src/hooks/useCard'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import CardActions from '@/src/components/layouts/main-layout/header/header-cart/card-item/CardActions'
import { useCreateOrder } from '@/src/hooks/queries/order/useCreateOrder'

const Order = () => {

  const searchParams = useSearchParams()
  const router = useRouter()

  const {user} = useProfile()
  const { orders, isLoading } = useGetOrders()
  const { items, total } = useCard()

  const {createOrder, isLoadingCreate} = useCreateOrder()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if(accessToken) saveTokenStorage(accessToken)
  }, [searchParams, orders])

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => router.push('/auth')
  })

  // const formattedOrders: IOrderColumn[] = (user?.moderator
  //   ? (orders ? orders.map(order => ({
  //     fullName: `${order.user.firstName} ${order.user.lastName}`,
  //
  //   })) : [])
  //   : (user ? user.orders.map(order => ({
  //   createdAt: formatDate(order.createdAt),
  //   status: order.status === EnumOrderStatus.PENDING ? 'В ожидании' : (order.status === EnumOrderStatus.FRAMED ? 'Оформлен' : 'Выполнен'),
  //   total: formatPrice(order.total)
  // })) : []))

  return (
    <div className={'h-full text-black bg-white my-6'}>
      <div className={'container'}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={'text-2xl font-bold'}>
            {user?.moderator ? 'Заказы всех пользователей' : 'Ваши заказы'}
          </h1>
          <Button variant={'ghost'} onClick={() => logout()}>
            <LogOut className={'size-4 mr-2'}/>
            Выйти
          </Button>
        </div>
        {/*<DataTable columns={OrderColumns} data={formattedOrders}/>*/}
        <div className={'grid grid-cols-3 gap-10'}>
          {items.map((item) => (
            <div key={item.id} className={'bg-gray-500/15 flex flex-col gap-5 items-center text-center px-1 pb-2 rounded-lg'}>
              <Link href={PUBLIC_URL.product(item.product.id)}>
                <img src={item.product.images[0]} alt={item.product.title} className={'size-40 rounded-md duration-300 hover:scale-105'}/>
              </Link>
              <h4>{item.product.title}</h4>
              <p>Выбранный размер: <span className={'font-bold'}>{item.size}</span></p>
              <div>
                <span>Количество:</span>
                <CardActions item={item}/>
              </div>
              <p className={'flex flex-col gap-1'}>
                <span>Итоговая стоимость товара:</span>
                <span className={'font-bold'}>{item.product.price * item.quantity} K</span>
              </p>
            </div>
          ))}
        </div>
        <p className={'text-center my-5 font-bold'}>Итоговая стоимость заказа: {total} K</p>
        <div className={'flex justify-center mt-5'}>
          <Button disabled={isLoadingCreate} onClick={() => createOrder()} size={'lg'} className={'cursor-pointer'}>Заказать товары</Button>
        </div>
      </div>
    </div>
  )
}

export default Order