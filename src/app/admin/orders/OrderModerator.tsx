'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/Select'
import { EnumOrderStatus, IOrder } from '@/src/shared/types/order.types'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useUpdateOrderStatus } from '@/src/hooks/queries/order/useUpdateOrderStatus'
import { useGetOrders } from '@/src/hooks/queries/order/useGetOrders'
import { useEffect, useState } from 'react'
import { Button } from '@/src/components/ui/Button'
import { useChangeOrderStatusArchived } from '@/src/hooks/queries/order/useChangeOrderStatusArchived'
import { useChangeOrderStatusCancelled } from '@/src/hooks/queries/order/useChangeOrderStatusCancelled'

const OrderModerator = () => {
  const { orders } = useGetOrders()

  const [updateOrders, setUpdateOrders] = useState<IOrder[] | []>([])
  const { changeOrderStatusArchived, isPendingStatusArchived } = useChangeOrderStatusArchived()
  const { changeOrderStatusCancelled, isPendingStatusCancelled } = useChangeOrderStatusCancelled()

  useEffect(() => {
    if(orders) {
      setUpdateOrders(orders as IOrder[])
    }
  }, [updateOrders, orders])

  const { isPendingStatus, updateOrderStatus } = useUpdateOrderStatus()

  return (
    <div className={'flex flex-col gap-5'}>
      {updateOrders.filter(order => !order.archived).length ? updateOrders.filter(order => !order.archived).map((order, index) => (
        <div key={order.id}>
          <hr className={'my-2 h-1.5 bg-black/20 rounded-full'}/>
          <div className={'flex justify-between items-center mb-3'}>
            <div>
              Сумма за заказ: <span className={'font-bold'}>{order.total} K</span>
            </div>
            <div className={'flex items-center gap-3 font-bold text-lg'}>
              <div className={`${order.cancelled ? 'text-red-500' : ''}`}>
                Статус:
              </div>
              {order.cancelled ? <span className={`text-red-500`}>Отменён</span> : (
                <Select
                  defaultValue={order.status}
                  disabled={isPendingStatus}
                  onValueChange={(value: EnumOrderStatus) => {
                    updateOrderStatus({ id: order.id, status: value })
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Размер"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Статус</SelectLabel>
                      <SelectItem value={"PENDING"}>Ожидание</SelectItem>
                      <SelectItem value={"FRAMED"}>Оформление</SelectItem>
                      <SelectItem value={"SUCCESSFUL"}>Успешный</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <div className={'mb-3 flex gap-5 items-center justify-between'}>
            <div className={'flex gap-5 items-center'}>
              <p>ФИО пользователя: <span className={'font-bold'}>{order.user.name}</span></p>
            </div>
            <div className={'flex gap-3'}>
              {!order.cancelled && (
                <Button
                  disabled={isPendingStatusCancelled}
                  onClick={() => changeOrderStatusCancelled(order.id)}
                >
                  Отменить заказ
                </Button>
              )}
              <Button
                disabled={isPendingStatusArchived}
                onClick={() => changeOrderStatusArchived(order.id)}
              >Добавить в архив</Button>
            </div>
          </div>
          <div className={'grid grid-cols-3 gap-10 px-1 py-5 border-solid border-2 border-black/30 rounded-lg'}>
            {order.orderItems.map(item => (
              <div key={item.id} className={'flex items-center gap-3'}>
                <Link href={PUBLIC_URL.product(item.product.id)}>
                  <img src={`/${item.product.images[0]}`} alt={item.product.title} className={'size-20 rounded-lg'}/>
                </Link>
                <div>
                  <p className={'text-sm font-bold'}>{item.product.title}</p>
                  <p>Количество товара: <span className={'font-bold'}>{item.quantity}</span></p>
                  <p>Размер: <span className={'font-bold'}>{item.size}</span></p>
                  <p>Сумма за товар: <span className={'font-bold'}>{item.price * item.quantity} K</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )) : (
        <div className={'text-2xl font-medium'}>
          <span className={'inline-block border-b-3 border-b-solid border-b-black/50'}>
            Пока что в вашем магазине нет заказов...
          </span>
        </div>)}
    </div>
  )
}

export default OrderModerator