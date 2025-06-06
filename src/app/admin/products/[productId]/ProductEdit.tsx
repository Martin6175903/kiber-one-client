'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/src/services/product.service'
import ProductForm from '@/src/app/admin/products/ProductForm'

const ProductEdit = () => {
  const params = useParams<{ productId: string }>()

  const { data } = useQuery({
    queryKey: ['get product'],
    queryFn: () => productService.getById(params.productId)
  })

  return <ProductForm product={data} />;
};

export default ProductEdit;