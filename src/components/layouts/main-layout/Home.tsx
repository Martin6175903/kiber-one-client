'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { saveTokenStorage } from '@/src/services/auth/auth-token.service'
import Review from '@/src/components/layouts/main-layout/review/Review'
import ProductsInfo from '@/src/components/layouts/main-layout/products/products-info/ProductsInfo'
import Products from '@/src/components/layouts/main-layout/products/Products'
import Delivery from '@/src/components/layouts/main-layout/delivery/Delivery'

const Home = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')

    if (accessToken) saveTokenStorage(accessToken)
  }, [searchParams])

  return (
    <div className={'bg-[#181818]'}>
      <Review/>
      <ProductsInfo/>
      <Products/>
      <Delivery/>
    </div>
  )
}

export default Home