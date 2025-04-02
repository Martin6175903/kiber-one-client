import { IProduct } from '@/src/shared/types/product.types'
import { Button } from '@/src/components/ui/Button'

interface AddToCartButtonProps {
  product: IProduct
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  return (
    <Button size={'lg'} className={'w-full'}>
      Добавить в корзину
    </Button>
  )
}

export default AddToCartButton