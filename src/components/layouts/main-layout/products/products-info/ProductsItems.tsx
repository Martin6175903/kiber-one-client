import ProductsItem from '@/src/components/layouts/main-layout/products/products-info/ProductsItem'
import { useGetProducts } from '@/src/hooks/queries/products/useGetProducts'

const ProductsItems = () => {
	const {products, isLoading} = useGetProducts()

	return (
		<div className={'grid grid-cols-3 gap-8 text-white'}>
			{isLoading
				? 'Loading...'
				: products?.sort((prev, current) => prev.id!.localeCompare(current.id!))?.map(product => (
					<ProductsItem key={product.id} product={product}/>
				))
			}
		</div>
	)
}

export default ProductsItems