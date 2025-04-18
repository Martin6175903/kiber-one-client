'use client'
import { useProfile } from '@/src/hooks/useProfile'
import { Button } from '@/src/components/ui/Button'
import { LogOut } from 'lucide-react'
import OrderUser from '@/src/app/(root)/order/OrderUser'
import OrderModerator from '@/src/app/(root)/order/OrderModerator'
import { useLogout } from '@/src/hooks/queries/auth/useLogout'

const Order = () => {
  const {user} = useProfile()
  const {logout} = useLogout()

  return (
    <div className={'h-full text-black bg-white my-6'}>
      <div className={'container'}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={'text-2xl font-bold'}>
            {user?.role === 1 ? 'Заказы всех пользователей' : 'Ваши заказы'}
          </h1>
          <Button variant={'ghost'} onClick={() => logout()}>
            <LogOut className={'size-4 mr-2'}/>
            Выйти
          </Button>
        </div>
        {user && (user.role === 1 ? (
          <OrderModerator/>
        ): (
          <OrderUser/>
        ))}
      </div>
    </div>
  )
}

export default Order