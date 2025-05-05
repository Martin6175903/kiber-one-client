import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'
import CreateProduct from '@/src/app/admin/products/create/CreateProduct'

export const metadata: Metadata = {
	title: 'Создание товара',
	...NO_INDEX_PAGE
}

const CreateProductPage = () => {
	return <CreateProduct />
}

export default CreateProductPage
