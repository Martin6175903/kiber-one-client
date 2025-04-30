import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import CardActions from '@/src/components/layouts/main-layout/header/header-cart/card-item/CardActions'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { useCard } from '@/src/hooks/useCard'
import { useCreateOrder } from '@/src/hooks/queries/order/useCreateOrder'
import { MousePointerClick } from 'lucide-react'
import { useRouter } from 'next/navigation'

const OrderUser = () => {
  const router = useRouter()

  const { items, total } = useCard()

  const {createOrder, isLoadingCreate} = useCreateOrder()
  return (
    <div>
      <div className={'grid grid-cols-3 gap-10 mb-5'}>
        {items.map((item) => (
          <div key={item.id} className={'bg-gray-500/15 flex flex-col gap-2 items-center text-center rounded-lg pt-2'}>
            <Link href={PUBLIC_URL.product(item.product.id)}>
              <img src={item.product.images[0]} alt={item.product.title} className={'size-50 rounded-md duration-300 hover:scale-105'}/>
            </Link>
            <div className={'flex flex-col gap-4 items-center bg-darkyellow w-full text-white rounded-md py-2 px-1 text-[17px]'}>
              <h4>{item.product.title}</h4>
              <p>Выбранный размер: <span className={'font-bold'}>{item.size}</span></p>
              <div className={'flex gap-3 items-center'}>
                <span>Количество:</span>
                <CardActions item={item}/>
              </div>
              <p className={'flex flex-col gap-1'}>
                <span>Итоговая стоимость товара:</span>
                <span className={'font-bold'}>{Number(item.product.price) * item.quantity} K</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {items.length > 0 ? (
        <p className={'text-center my-5 font-bold'}>Итоговая стоимость заказа: {total} K</p>
      ) : (
        <div className={'text-xl font-medium flex flex-col gap-3'}>
          <span>Здесь пока что нет заказов... :(</span>
          <div>
            <Link className={'inline-block border-b-solid border-b-3 border-b-black/60 animate-pulse hover:animate-none duration-300 hover:scale-110'} href={PUBLIC_URL.home()}>
              <div className={'flex items-end'}>
                <span>Обратно в магазин :)</span>
                <MousePointerClick />
              </div>
            </Link>
          </div>
        </div>
      )}
      <div className={'flex justify-center mt-5'}>
        {items.length > 0 && (
          <ConfirmModal handleClick={() => {
            createOrder()
            router.push('/thanks')
          }} title={'Заказать Kiber-товары!'} confirmBtnText={'Заказать'}/>
        )}
      </div>
    </div>
  )
}

export default OrderUser