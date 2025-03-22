import { Metadata } from 'next'
import Home from '@/src/app/(root)/home/Home'

export const metadata: Metadata = {
	title: 'Ваш шопинг, ваше удовольствие - всё в одном месте!'
}

const HomePage = () => {
	return (
		<Home/>
	)
}

export default HomePage