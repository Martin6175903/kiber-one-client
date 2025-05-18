'use client'

import { IProduct } from '@/src/shared/types/product.types'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/src/services/product.service'
import ProductGallery from '@/src/app/(root)/product/[id]/product-gallery/ProductGallery'
import ProductInfo from '@/src/app/(root)/product/[id]/product-info/ProductInfo'
import { useGetProduct } from '@/src/hooks/queries/products/useGetProduct'

const Product = () => {
  const {product, isLoadingProduct} = useGetProduct()

  return (
      <div className={'mx-auto max-w-7xl'}>
        <div className={'space-y-7 px-4 py-10 sm:px-6 lg:px-8'}>
          <div className={'lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'}>
            {isLoadingProduct ? <div>Loading...</div> : (
              <>
                <ProductGallery product={product!}/>
                <ProductInfo product={product!}/>
              </>
            )}
          </div>
        </div>
      </div>
  )
}

export default Product