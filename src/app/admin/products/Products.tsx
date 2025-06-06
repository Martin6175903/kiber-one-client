'use client'

import { useGetProducts } from '@/src/hooks/queries/products/useGetProducts'
import productsColumn, { IProductsColumn } from '@/src/app/admin/products/ProductsColumn'
import DataTableLoading from '@/src/components/ui/data-loading/DataTableLoading'
import Link from 'next/link'
import { Button } from '@/src/components/ui/Button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/src/components/ui/data-loading/DataTable'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useEffect, useState } from 'react'
import { productService } from '@/src/services/product.service'
import { IProduct } from '@/src/shared/types/product.types'

const Products = () => {
  const { products, isLoading } = useGetProducts()

  const formattedProducts: IProductsColumn[] = products ? products.map(product => ({
    id: product.id,
    image: product.images[0],
    title: product.title,
    description: product.description,
    price: product.price,
    size: product.size,
    isStock: product.isStock
  })) : []

  return (
    <div className={'container'}>
      {isLoading ? (
        <DataTableLoading/>
      ) : (
        <div>
          <div className={'flex justify-between items-end py-5'}>
            <div className={'flex flex-col gap-3'}>
              <h2 className={'title mb-5'}>Все товары вашего магазина</h2>
              <h5 className={'text-2xl font-bold'}>{`Товары (${products?.length})`}</h5>
            </div>
            <div>
              <Link href={PUBLIC_URL.admin('/products/create')}>
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