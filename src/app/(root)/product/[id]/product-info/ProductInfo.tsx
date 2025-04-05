'use client'
import { IProduct } from '@/src/shared/types/product.types'
import { formatPrice } from '@/src/utils/string/format-price'
import AddToCartButton from '@/src/app/(root)/product/[id]/product-info/AddToCartButton'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/Select'
import CardActions from '@/src/components/layouts/main-layout/header/header-cart/card-item/CardActions'
import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/src/components/ui/Button'
import { useActions } from '@/src/hooks/useActions'
import { useCard } from '@/src/hooks/useCard'

interface ProductInfoProps {
  product: IProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [choiceSize, setChoiceSize] = useState(product?.size?.length ? product.size[0] : undefined)
  const { changeQuantity } = useActions()
  const [quantity, setQuantity] = useState(1)

  const { items } = useCard()
  const storeItem = items.find(item => item.product.title === product.title)
  const [total, setTotal] = useState<number>(Number(product.price))

  useEffect(() => {
    if (storeItem) {
      setTotal(Number(product.price) * storeItem?.quantity)
    } else {
      setTotal(Number(product.price) * quantity)
    }
  }, [storeItem?.quantity, quantity])

  return (
    <div className={'mt-10 space-y-5 sm:mt-16 lg:mt-0 [&>hr]:my-4'}>
      <h1 className={'text-3xl font-bold'}>{product.title}</h1>
      <div className="text-2xl">{product.price} K</div>
      <hr/>
      <blockquote className="text-muted-foreground text-sm">{product.description}</blockquote>
      {product.size?.length ? (
        <div className={'*:cursor-pointer *:hover:bg-amber-50/5 *:duration-500 mb-5'}>
          {product.size?.length === 1 ? <span>Доступные размеры: {choiceSize}</span> : (
            <Select defaultValue={product.size[0]} onValueChange={(value) => setChoiceSize(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Размер" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Размеры</SelectLabel>
                  {product.size!.map(size => (
                    <SelectItem value={size} key={size}>{size}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      ) : (
        <p>Размеры на данный товар отсутсвуют.</p>
      )}
      <div className={'flex gap-5 items-center'}>
        <p>Количество товара:</p>
        <div className={'flex items-center mt-1'}>
          <Button
            onClick={() => {
              if (storeItem) {
                changeQuantity({ id: storeItem?.id, type: 'minus' })
              } else {
                setQuantity(quantity - 1)
              }
            }}
            variant={'ghost'}
            size={'icon'}
            disabled={storeItem ? storeItem.quantity === 1 : quantity === 1}
            className={'size-7 cursor-pointer'}
          >
            <Minus className={'size-4'}/>
          </Button>

          <input className={'w-10 text-center text-base'} type="text" disabled readOnly value={storeItem ? storeItem.quantity : quantity} />

          <Button
            onClick={() => {
              if (storeItem) {
                changeQuantity({ id: storeItem?.id, type: 'plus' })
              } else {
                setQuantity(quantity + 1)
              }
            }}
            variant={'ghost'}
            size={'icon'}
            className={'size-7 cursor-pointer'}
          >
            <Plus className={'size-4'}/>
          </Button>
        </div>
      </div>
      <p className={'flex gap-3'}>
        Конечная сумма:
        <span className={'font-bold'}>{total} K</span>
      </p>
      <hr/>
      <div>
        <AddToCartButton product={product} quantity={storeItem ? storeItem.quantity : quantity} size={choiceSize !== undefined ? choiceSize : undefined}/>
      </div>
    </div>
  )
}

export default ProductInfo