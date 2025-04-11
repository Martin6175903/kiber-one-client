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
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useUpdateOrderStatus } from '@/src/hooks/queries/order/useUpdateOrderStatus'
import { useDeleteOrder } from '@/src/hooks/queries/order/useDeleteOrder'
import { useGetOrders } from '@/src/hooks/queries/order/useGetOrders'
import { useEffect, useState } from 'react'

const OrderModerator = () => {
  const { orders } = useGetOrders()

  const [updateOrders, setUpdateOrders] = useState<IOrder[] | undefined>(undefined)

  useEffect(() => {
    if(updateOrders === undefined) {
      setUpdateOrders(orders)
    }

  }, [updateOrders, orders])
  const { isPendingStatus, updateOrderStatus } = useUpdateOrderStatus()
  const { deleteOrder, isLoadingDelete } = useDeleteOrder()
  return (
    <div className={'flex flex-col gap-5'}>
      {updateOrders && updateOrders.map((order,index) => (
        <div key={order.id}>
          <hr className={'my-2 h-1.5 bg-black/20 rounded-full'}/>
          <div className={'flex justify-between items-center mb-3'}>
            <div>
              Сумма за заказ: <span className={'font-bold'}>{order.total} K</span>
            </div>
            <div className={'flex items-center gap-3'}>
              <div className={'font-bold'}>
                Статус:
              </div>
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
            </div>
          </div>
          <div className={'mb-3 flex gap-5 items-center justify-between'}>
            <div className={'flex gap-5 items-center'}>
              <p>Имя пользователя: <span className={'font-bold'}>{order.user.firstName}</span></p>
              <p>Фамилия пользователя: <span className={'font-bold'}>{order.user.lastName}</span></p>
            </div>
            <div>
              <ConfirmModal
                handleClick={() => {
                  deleteOrder({id: order.id})
                  updateOrders.splice(index, 1)
                  setUpdateOrders(updateOrders)
                }}
                title={'Удалить заказ'}
                confirmBtnText={'Удалить'}
                disabled={isLoadingDelete}
              />
            </div>
          </div>
          <div className={'grid grid-cols-3 gap-10 px-1 py-5 border-solid border-2 border-black/30 rounded-lg'}>
            {order.orderItems.map(item => (
              <div key={item.id} className={'flex items-center gap-3'}>
                <Link href={PUBLIC_URL.product(item.product.id)}>
                  <img src={item.product.images[0]} alt={item.product.title} className={'size-20 rounded-lg'}/>
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
      ))}
    </div>
  )
}

export default OrderModerator