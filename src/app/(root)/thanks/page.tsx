import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Спасибо за покупку',
	...NO_INDEX_PAGE
}

const ThanksPage = () => {
	return (
		<div className={'h-full bg-[#131312] text-white flex items-center'}>
			<div className={'container'}>
				<div className={'text-center flex flex-col gap-7'}>
					<h1 className={'text-5xl font-semibold'}>Спасибо за ваш заказ!</h1>
					<p className={'text-xl'}>
						Мы ценим ваше доверие и приложим все усилия, чтобы доставить ваш заказ как можно скорее.
					</p>
					<div>
						<Link className={'*:cursor-pointer'} href={PUBLIC_URL.home()}>
							<Button variant={'secondary'}>
								На главную
								<ArrowRight/>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ThanksPage