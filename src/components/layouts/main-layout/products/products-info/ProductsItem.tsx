import { IProduct } from '@/src/shared/types/product.types'
import Image from 'next/image'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/src/components/ui/Select'
import * as React from 'react'
import { Button } from '@/src/components/ui/Button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PUBLIC_URL } from '@/src/config/url.config'

interface ProductsItemProps {
	product: IProduct
}

const ProductsItem = ({ product }: ProductsItemProps) => {
	const { title, description, price, images, size, id, isStock } = product
	return (
		<div
			className={
				'flex flex-col gap-5 text-center bg-gray-800/30 rounded-b-lg rounded-t-xl duration-400 hover:scale-[1.03]'
			}
		>
			<Link
				href={`product/${id}`}
				className={'max-[1200px]:flex max-[1200px]:justify-center relative'}
			>
				{!isStock && (
					<div
						className={
							'bg-red-500/70 py-2 px-4 rounded-xl absolute text-xl animate-pulse'
						}
					>
						Предзаказ
					</div>
				)}
				<img
					src={images[0]}
					alt={title}
					className={
						'size-[215px] md:w-[385px] md:h-[400px] rounded-t-xl object-cover'
					}
				/>
			</Link>
			<div className={'flex flex-col gap-4 items-center p-5'}>
				<h4 className={'text-lg font-medium capitalize'}>{title}</h4>
				<p className={'text-[32px] font-extrabold uppercase'}>{price} к</p>
				{/*<div className={'*:cursor-pointer *:hover:bg-amber-50/5 *:duration-500'}>*/}
				{/*  {size?.length === 1 ? <span>Размер: {size[0]}</span> : (*/}
				{/*    <Select>*/}
				{/*      <SelectTrigger className="w-[180px]">*/}
				{/*        <SelectValue placeholder="Размер" />*/}
				{/*      </SelectTrigger>*/}
				{/*      <SelectContent>*/}
				{/*        <SelectGroup>*/}
				{/*          <SelectLabel>Размеры</SelectLabel>*/}
				{/*          {size!.map(size => (*/}
				{/*            <SelectItem value={size} key={size}>{size}</SelectItem>*/}
				{/*          ))}*/}
				{/*        </SelectGroup>*/}
				{/*      </SelectContent>*/}
				{/*    </Select>*/}
				{/*  )}*/}
				{/*</div>*/}
				<Button
					className={
						'bg-darkyellow border border-solid border-transparent hover:bg-black duration-300 *:cursor-pointer cursor-pointer'
					}
				>
					<Link href={`product/${id}`} className={'flex gap-4 items-center'}>
						<span>Подбробнее</span>
						<ArrowRight className={'size-4'} />
					</Link>
				</Button>
			</div>
		</div>
	)
}

export default ProductsItem
