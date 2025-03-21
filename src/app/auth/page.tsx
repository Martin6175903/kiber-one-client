import { Metadata } from 'next'
import Auth from '@/src/app/auth/Auth'

export const metadata: Metadata = {
	title: 'Авторизация'
}

const Page = () => {
	return (
		<Auth/>
	)
}

export default Page