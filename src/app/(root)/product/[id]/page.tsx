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

async function getProductById(id: string) {
	try {
		const product = await productService.getById(id)

		return { product }
	} catch (err) {
		return notFound()
	}
}

type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const { product } = await getProductById(id)

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

const ProductPage = async ({ params }: Props) => {
	const { id } = await params;
	const { product } = await getProductById(id)

	return <Product id={id} initialProduct={product}/>
}

export default ProductPage
