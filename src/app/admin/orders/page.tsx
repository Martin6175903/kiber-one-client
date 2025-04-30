import { Metadata } from 'next'
import Order from '@/src/app/admin/orders/Order'

export const metadata: Metadata = {
  title: 'Ваша корзина КИБЕРТОВАРОВ!'
}

const Page = async () => {
  return <Order/>
}

export default Page