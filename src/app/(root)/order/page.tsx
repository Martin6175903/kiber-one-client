import { Metadata } from 'next'
import Order from '@/src/app/(root)/order/Order'

export const metadata: Metadata = {
	title: 'Ваша корзина КИБЕРТОВАРОВ!'
}

const Page = async () => {
	return <Order />
}

export default Page
