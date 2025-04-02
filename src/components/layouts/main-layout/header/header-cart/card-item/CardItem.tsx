import { ICardItem } from '@/src/shared/types/card.types'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import Image from 'next/image'
import { formatPrice } from '@/src/utils/string/format-price'
import CardActions from '@/src/components/layouts/main-layout/header/header-cart/card-item/CardActions'

interface CardItemProps {
  item: ICardItem
}

const CardItem = ({ item }: CardItemProps) => {
  return (
    <div>
      <div className="flex items-center mb-5">
        <Link href={PUBLIC_URL.product(item.product.id)} className={'image'}>
          <Image className={'relative size-7 rounded-md overflow-hidden [&>img]:object-cover'} src={`/${item.product.images[0]}`} alt={item.product.title} fill/>
        </Link>
        <div className="ml-6">
          <h2 className={'font-medium line-clamp-1'}>{item.product.price}</h2>
          <p className={'text-sm text-muted-foreground mt-1'}>{formatPrice(item.product.price)}</p>
          <CardActions item={item}/>
        </div>
      </div>
    </div>
  )
}

export default CardItem