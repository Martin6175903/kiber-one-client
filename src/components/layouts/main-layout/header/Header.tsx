'use client'
import Logo from '@/src/components/layouts/main-layout/header/logo/Logo'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import HeaderCart from '@/src/components/layouts/main-layout/header/header-cart/HeaderCart'
import { useProfile } from '@/src/hooks/useProfile'
import { useCard } from '@/src/hooks/useCard'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useGetOrders } from '@/src/hooks/queries/order/useGetOrders'
import { Button } from '@/src/components/ui/Button'
import { useUserContext } from '@/src/providers/user.context'

const Header = () => {

	const { user } = useUserContext()

	return (
		<header className={'pt-6 pb-9 bg-linear-[-85deg,#202020_0%,#0C0C0C_40%,#1B1818_50%,#080808_60%,#202020_100%]'}>
			<div className="container">
				<div className={'relative flex justify-between items-center max-md:flex-col max-md:gap-8'}>
					<Logo/>
					<div className={'absolute top-1/2 left-1/2 md:-translate-[50%] max-md:static flex flex-col gap-2 items-center'}>
						<h1 className={'uppercase text-4xl font-bold text-white'}>Kibershop</h1>
						{user && user.role === 'MODERATOR' && <Link href={PUBLIC_URL.admin()}>
							<Button className={'text-lg py-5 px-7 flex duration-300 hover:scale-110'} variant={'secondary'}>Админка</Button>
						</Link>}
					</div>
					<div className={'text-white flex items-center gap-5 justify-end'}>
						<Link href={PUBLIC_URL.home('#products')} className={'text-lg text-black py-3.5 px-6 bg-white rounded-full uppercase font-medium border-2 border-solid border-transparent hover:bg-transparent hover:text-white hover:border-white hover:scale-105 duration-300'}>
							Кибертовары
						</Link>
						<Link href={'#'} className={'relative hover:scale-110 duration-300'}>
							<HeaderCart>
								<ShoppingCart size={40}/>
								<span className={'absolute -bottom-1 -right-2 text-xs px-1.5 py-0.5 bg-white text-darkblue rounded-full font-bold'}>
									{user ? user?.orders.length : 0}
								</span>
							</HeaderCart>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header