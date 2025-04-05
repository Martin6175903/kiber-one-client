'use client'
import { DataTable } from '@/src/components/ui/data-loading/DataTable'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { saveTokenStorage } from '@/src/services/auth/auth-token.service'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/src/services/auth/auth.service'
import { useProfile } from '@/src/hooks/useProfile'
import OrderColumns, { IOrderColumn } from '@/src/app/(root)/order/OrderColumns'
import { EnumOrderStatus } from '@/src/shared/types/order.types'
import { formatPrice } from '@/src/utils/string/format-price'
import { formatDate } from '@/src/utils/date/format-date'
import { Button } from '@/src/components/ui/Button'
import { LogOut } from 'lucide-react'
import { useGetOrders } from '@/src/hooks/queries/order/useGetOrders'

const Order = () => {

  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    const accessToken = searchParams.get('accessToken')

    if(accessToken) saveTokenStorage(accessToken)
  }, [searchParams])

  const {user} = useProfile()

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => router.push('/auth')
  })

  const formattedOrders: IOrderColumn[] = user ? user.orders.map(order => ({
    createdAt: formatDate(order.createdAt),
    status: order.status === EnumOrderStatus.PENDING ? 'В ожидании' : (order.status === EnumOrderStatus.FRAMED ? 'Оформлен' : 'Выполнен'),
    total: formatPrice(order.total)
  })) : []

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
        <DataTable columns={OrderColumns} data={formattedOrders}/>
      </div>
    </div>
  )
}

export default Order