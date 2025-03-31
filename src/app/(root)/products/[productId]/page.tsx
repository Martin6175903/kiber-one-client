import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'
import ProductEdit from '@/src/app/(root)/products/[productId]/ProductEdit'

export const metadata: Metadata = {
  title: 'Редактирование товара',
  ...NO_INDEX_PAGE
}

const ProductEditPage = () => {
  return <ProductEdit/>
}

export default ProductEditPage