import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'
import Products from '@/src/app/(root)/products/Products'

export const metadata:Metadata = {
  title: 'Товары',
  ...NO_INDEX_PAGE
}

const ProductsPage = () => {
  return <Products/>
}

export default ProductsPage