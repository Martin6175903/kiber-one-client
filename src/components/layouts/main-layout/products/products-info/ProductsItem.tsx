import { IProduct } from '@/src/shared/types/product.types'
import Image from 'next/image'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/src/components/ui/Select'
import * as React from 'react'
import { Button } from '@/src/components/ui/Button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ProductsItemProps {
  product: IProduct
}

const ProductsItem = ({product} :ProductsItemProps ) => {
	const {title, description, price, images, size } = product
 return (
  <div className={'flex flex-col gap-5 text-center'}>
    <Link href={'#'}>
      <img src={images[0]} alt={title} className={'w-[385px] h-[400px]'}/>
    </Link>
    <div className={'flex flex-col gap-4 items-center'}>
      <h4 className={'text-base font-extrabold capitalize'}>{title}</h4>
      <p className={'text-[32px] font-extrabold uppercase'}>{price} к</p>
      <div className={'*:cursor-pointer *:hover:bg-amber-50/5 *:duration-500'}>
        {size?.length === 1 ? <span>{size[0]}</span> : (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Размер" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Размеры</SelectLabel>
                {size!.map(size => (
                  <SelectItem value={size} key={size}>{size}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      <Button className={'bg-darkyellow border border-solid border-transparent hover:bg-black duration-300 *:cursor-pointer cursor-pointer'}>
        <Link href={'product'} className={'flex gap-4 items-center'}>
          <span>Подбробнее</span>
          <ArrowRight className={'size-4'}/>
        </Link>
      </Button>
    </div>
  </div>
 );
};

export default ProductsItem;