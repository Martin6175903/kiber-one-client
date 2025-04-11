'use client'
import Logo from '@/src/components/layouts/main-layout/header/logo/Logo'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import HeaderCart from '@/src/components/layouts/main-layout/header/header-cart/HeaderCart'
import { useProfile } from '@/src/hooks/useProfile'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/src/app/(root)/layout'
import { IUser } from '@/src/shared/types/user.types'
import { useCard } from '@/src/hooks/useCard'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useGetOrders } from '@/src/hooks/queries/order/useGetOrders'

const Header = () => {

	const {user, isLoading} = useProfile()
	const {orders} = useGetOrders()
	const {items} = useCard()

	return (
		<header className={'pt-6 pb-9 bg-linear-[-85deg,#202020_0%,#0C0C0C_40%,#1B1818_50%,#080808_60%,#202020_100%]'}>
			<div className="container">
				<div className={'relative flex justify-between items-center max-md:flex-col max-md:gap-8'}>
					<Logo/>
					<h1 className={'uppercase text-4xl font-bold text-white absolute top-1/2 left-1/2 md:-translate-[50%] max-md:static'}>Kibershop</h1>
					<div className={'text-white flex items-center gap-5 justify-end'}>
						<Link href={isLoading ? '#' : (user!.moderator ? PUBLIC_URL.products() : PUBLIC_URL.home('#products'))} className={'text-lg text-black py-3.5 px-6 bg-white rounded-full uppercase font-medium border-2 border-solid border-transparent hover:bg-transparent hover:text-white hover:border-white hover:scale-105 duration-300'}>
							Кибертовары
						</Link>
						<Link href={'#'} className={'relative hover:scale-110 duration-300'}>
							<HeaderCart>
								<ShoppingCart size={40}/>
								<span className={'absolute -bottom-1 -right-2 text-xs px-1.5 py-0.5 bg-white text-darkblue rounded-full font-bold'}>
									{user && user.moderator ? orders && orders.length : items.length}
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