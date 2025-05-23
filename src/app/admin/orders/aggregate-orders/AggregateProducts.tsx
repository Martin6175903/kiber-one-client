'use client'

import { useGetProducts } from '@/src/hooks/queries/products/useGetProducts'
import { useGetProductsAggregation } from '@/src/hooks/queries/order/useGetProductsAggregation'
import { IProduct, IProductAggregation } from '@/src/shared/types/product.types'
import Image from 'next/image'

const AggregateProducts = () => {
	const {productsAggregation, isLoadingProductsAggregation} = useGetProductsAggregation()

	return (
		<div className={'h-full text-black bg-white my-6'}>
			<div className={'container'}>
				<div>
					<h1 className={'title mb-5'}>
						Статистика заказов
					</h1>
					<div className={'flex flex-col gap-3'}>
						{!isLoadingProductsAggregation && productsAggregation.map((info: IProductAggregation) => (
							<div>
								<div key={info.product.id} className={'flex gap-5 items-center'}>
									<div>
										<Image className={'rounded-xl'} src={`/${info.product.images[0]}`} alt={info.product.title} width={70} height={70}/>
									</div>
									<div className={'flex flex-col gap-1 text-lg font-medium text-black/75'}>
										<h5>
											<span>Наименование:</span> <span className={'font-bold text-black/85'}>{info.product.title}</span>
										</h5>
										<p>
											<span>Цена товара:</span> <span className={'font-bold text-black/85'}>{info.product.price} K</span>
										</p>
									</div>
									<div className={'flex flex-col gap-1 text-lg font-medium text-black/75'}>
										<p>
											<span>Размер товара:</span> <span className={'font-bold text-black/85'}>{info.bufferSize}</span>
										</p>
										<p>
											<span>Количество товара:</span> <span className={'font-bold text-black/85'}>{info.totalQuantity}</span>
										</p>
									</div>
								</div>
								<div className={'h-1 w-full bg-blue-500/15 mt-3'}></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AggregateProducts