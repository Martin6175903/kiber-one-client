'use client'
import { useProfile } from '@/src/hooks/useProfile'
import { Button } from '@/src/components/ui/Button'
import { LogOut } from 'lucide-react'
import OrderUser from '@/src/app/(root)/order/OrderUser'
import { useLogout } from '@/src/hooks/queries/auth/useLogout'

const Order = () => {
  const {logout} = useLogout()

  return (
    <div className={'h-full text-black bg-white my-6'}>
      <div className={'container'}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={'text-2xl font-bold'}>
            Ваши заказы
          </h1>
        </div>
        <OrderUser/>
      </div>
    </div>
  )
}

export default Order