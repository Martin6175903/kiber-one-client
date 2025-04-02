import { IProduct } from '@/src/shared/types/product.types'
import { Button } from '@/src/components/ui/Button'
import { useActions } from '@/src/hooks/useActions'
import { useCard } from '@/src/hooks/useCard'

interface AddToCartButtonProps {
  product: IProduct
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCard, removeFromCard } = useActions()
  const { items } = useCard()

  const currentElement = items.find(
    cardItem => cardItem.product.id === product.id
  )

  return (
    <Button size={'lg'} className={'w-full'} onClick={() =>
      currentElement
        ? removeFromCard({ id: currentElement.id })
        : addToCard({ product, quantity: 1, price: Number(product.price) })
    }>
      {currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
    </Button>
  )
}

export default AddToCartButton