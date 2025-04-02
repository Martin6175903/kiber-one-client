import { productService } from '@/src/services/product.service'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Product from '@/src/app/(root)/product/[id]/Product'

export const revalidate = 60

export async function generateStaticParams() {
	const products = await productService.getAll()

	return products.map(product => ({
			params: { id: product.id }
		}))
}

export async function getProduct(params: {id:string}) {
	try {
		const product = await productService.getById(params.id)

		return { product }
	} catch (err) {
		return notFound()
	}
}

export async function generateMetadata({ params }: {params: {id: string}}): Promise<Metadata> {
	const { product } = await getProduct(params)

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.images[0],
					width: 1000,
					height: 1000,
					alt: product.title
				}
			]
		}
	}
}

const ProductPage = async ({ params }: {params: {id: string}}) => {
	const { product } = await getProduct(params)

	return <Product id={params.id} initialProduct={product}/>
}

export default ProductPage