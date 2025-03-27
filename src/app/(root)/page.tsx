import Review from '@/src/components/layouts/main-layout/review/Review'
import ProductsInfo from '@/src/components/layouts/main-layout/products/products-info/ProductsInfo'
import Delivery from '@/src/components/layouts/main-layout/delivery/Delivery'
import Products from '@/src/components/layouts/main-layout/products/Products'

export const revalidate = 60

const Page = () => {
	return (
		<div className={'bg-[#181818]'}>
			<Review/>
			<ProductsInfo/>
			<Products/>
			<Delivery/>
		</div>
	)
}

export default Page