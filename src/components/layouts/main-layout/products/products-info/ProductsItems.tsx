import { useEffect, useState } from 'react'
import { IProduct } from '@/src/shared/types/product.types'
import { productService } from '@/src/services/product.service'
import ProductsItem from '@/src/components/layouts/main-layout/products/products-info/ProductsItem'

const ProductsItems = () => {
	const [products, setProducts] = useState<IProduct[]>([])

	useEffect(() => {
		async function getProducts() {
			return productService.getAll()
		}
		getProducts().then(data => setProducts(data))
	}, [])

	return (
		<div className={'grid grid-cols-3 gap-8'}>
			{products.map(product => (
				<ProductsItem key={product.id} product={product}/>
			))}
		</div>
	)
}

export default ProductsItems