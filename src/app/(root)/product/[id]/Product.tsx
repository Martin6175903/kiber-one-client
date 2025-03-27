'use client'

import { IProduct } from '@/src/shared/types/product.types'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/src/services/product.service'
import ProductGallery from '@/src/app/(root)/product/[id]/product-gallery/ProductGallery'
import ProductInfo from '@/src/app/(root)/product/[id]/product-info/ProductInfo'

interface ProductProps {
  initialProduct: IProduct
  id?: string
}

const Product = ({ initialProduct, id = '' }: ProductProps) => {
  const { data: product } = useQuery({
    queryKey: ['product', initialProduct.id],
    queryFn: () => productService.getById(id),
    initialData: initialProduct,
    enabled: !!id,
  })

  return (
    <div>
      <div>
        <div>
          <ProductGallery product={product}/>
          <ProductInfo product={product}/>
        </div>
      </div>
    </div>
  )
}

export default Product