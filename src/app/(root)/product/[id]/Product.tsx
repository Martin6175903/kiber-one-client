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
    enabled: !!id
  })

  return (
      <div className={'mx-auto max-w-7xl'}>
        <div className={'space-y-7 px-4 py-10 sm:px-6 lg:px-8'}>
          <div className={'lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'}>
            <ProductGallery product={product}/>
            <ProductInfo product={product}/>
          </div>
        </div>
      </div>
  )
}

export default Product