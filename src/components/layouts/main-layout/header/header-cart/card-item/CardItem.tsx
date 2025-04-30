import { ICardItem } from '@/src/shared/types/card.types'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import Image from 'next/image'
import { formatPrice } from '@/src/utils/string/format-price'
import CardActions from '@/src/components/layouts/main-layout/header/header-cart/card-item/CardActions'
import { CircleX } from 'lucide-react'
import { useActions } from '@/src/hooks/useActions'

interface CardItemProps {
  item: ICardItem
}

const CardItem = ({ item }: CardItemProps) => {
  const {removeFromCard} = useActions()
  return (
    <div className="flex items-center mb-5 relative bg-gray-100/10 rounded-md px-1 py-2">
      <Link href={PUBLIC_URL.product(item.product.id)} className={'relative size-30 rounded-md overflow-hidden'}>
        <Image className={'object-cover'} src={`/${item.product.images[0]}`} alt={item.product.title} fill/>
      </Link>
      <div className="ml-6">
        <h2 className={'font-medium line-clamp-1'}>{item.product.title}</h2>
        <div className={'mb-2'}>
          <p className={'text-sm text-muted-foreground mt-1'}>{item.product.price} K</p>
          <p className={'text-sm text-muted-foreground mt-1'}>{item.size}</p>
        </div>
        <CardActions item={item}/>
        <button className={'mt-2 text-sm border-solid border-white border rounded-full py-2 px-3 duration-300 hover:text-darkyellow hover:border-darkyellow cursor-pointer'} onClick={() => removeFromCard({ id: item.id })}>
          Удалить из корзины
        </button>
      </div>
    </div>
  )
}

export default CardItem