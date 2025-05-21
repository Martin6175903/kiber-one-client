import AggregateProducts from '@/src/app/admin/orders/aggregate-orders/AggregateProducts'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Статистика заказов'
}

const Page = () => {
	return <AggregateProducts/>
}

export default Page