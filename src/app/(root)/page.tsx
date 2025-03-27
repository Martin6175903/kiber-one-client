import Review from '@/src/components/layouts/main-layout/review/Review'
import ProductsInfo from '@/src/components/layouts/main-layout/products/products-info/ProductsInfo'
import Delivery from '@/src/components/layouts/main-layout/delivery/Delivery'
import { productService } from '@/src/services/product.service'

export const revalidate = 60

const Page = () => {
	return (
		<div>
			<Review/>
			<ProductsInfo/>
			<Delivery/>
		</div>
	)
}

export default Page