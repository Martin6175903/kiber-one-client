import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import CardActions from '@/src/components/layouts/main-layout/header/header-cart/card-item/CardActions'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { useCard } from '@/src/hooks/useCard'
import { useCreateOrder } from '@/src/hooks/queries/order/useCreateOrder'

const OrderUser = () => {
  const { items, total } = useCard()

  const {createOrder, isLoadingCreate} = useCreateOrder()
  return (
    <div>
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
              <span className={'font-bold'}>{Number(item.product.price) * item.quantity} K</span>
            </p>
          </div>
        ))}
      </div>
      <p className={'text-center my-5 font-bold'}>Итоговая стоимость заказа: {total} K</p>
      <div className={'flex justify-center mt-5'}>
        {items.length > 0 && (
          <ConfirmModal handleClick={() => {
            console.log(items)
            createOrder()
          }} title={'Заказать Kiber-товары!'} confirmBtnText={'Заказать'}/>
        )}
      </div>
    </div>
  )
}

export default OrderUser