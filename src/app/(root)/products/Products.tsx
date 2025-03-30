'use client'

import { useGetProducts } from '@/src/hooks/queries/products/useGetProducts'
import productsColumn, { IProductsColumn } from '@/src/app/(root)/products/ProductsColumn'
import DataTableLoading from '@/src/components/ui/data-loading/DataTableLoading'
import Link from 'next/link'
import { Button } from '@/src/components/ui/Button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/src/components/ui/data-loading/DataTable'
import { PUBLIC_URL } from '@/src/config/url.config'

const Products = () => {
  const { products, isLoading } = useGetProducts()

  const formattedProducts: IProductsColumn[] = products ? products.map(product => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    size: product.size
  })) : []

  return (
    <div className={'container'}>
      {isLoading ? (
        <DataTableLoading/>
      ) : (
        <div>
          <div className={'flex justify-between items-center py-5'}>
            <div className={'flex flex-col gap-3'}>
              <h1 className={'text-2xl font-bold'}>{`Товары (${products?.length})`}</h1>
              <p className={'text-xl text-gray-600'}>Все товары вашего магазина</p>
            </div>
            <div>
              <Link href={PUBLIC_URL.product('/create')}>
                <Button variant={'default'}>
                  <Plus/>
                  Создать
                </Button>
              </Link>
            </div>
          </div>
          <div className={'mt-3'}>
            <DataTable columns={productsColumn} data={formattedProducts} filterKey={'title'}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products