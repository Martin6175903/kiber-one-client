import { IProduct } from '@/src/shared/types/product.types'
import { formatPrice } from '@/src/utils/string/format-price'
import AddToCartButton from '@/src/app/(root)/product/[id]/product-info/AddToCartButton'

interface ProductInfoProps {
  product: IProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className={'mt-10 space-y-5 sm:mt-16 lg:mt-0 [&>hr]:my-4'}>
      <h1 className={'text-3xl font-bold'}>{product.title}</h1>
      <div className="text-2xl">{product.price} K</div>
      <hr/>
      <blockquote className="text-muted-foreground text-sm">{product.description}</blockquote>
      <hr/>
      <div>
        <AddToCartButton product={product}/>
      </div>
    </div>
  )
}

export default ProductInfo