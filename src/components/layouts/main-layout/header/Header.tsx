'use client'
import Logo from '@/src/components/layouts/main-layout/header/logo/Logo'
import { LogOut, ShoppingCart, User, Wallet } from 'lucide-react'
import Link from 'next/link'
import HeaderCart from '@/src/components/layouts/main-layout/header/header-cart/HeaderCart'
import { useProfile } from '@/src/hooks/useProfile'
import { useCard } from '@/src/hooks/useCard'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useGetOrders } from '@/src/hooks/queries/order/useGetOrders'
import { Button } from '@/src/components/ui/Button'
import { useUserContext } from '@/src/providers/user.context'
import { useLogout } from '@/src/hooks/queries/auth/useLogout'
import Image from 'next/image'

const Header = () => {

	const { user, isLoadingUser } = useUserContext()
	const {items} = useCard()
	const {logout} = useLogout()

	return (
		<header className={'pt-6 pb-9 bg-linear-[-85deg,#202020_0%,#0C0C0C_40%,#1B1818_50%,#080808_60%,#202020_100%]'}>
			<div className="container">
				<div className={'relative flex justify-between items-center max-md:flex-col max-md:gap-8'}>
					<Logo/>
					<div className={'absolute top-1/2 left-1/2 md:-translate-[50%] max-md:static flex flex-col gap-2 items-center'}>
						<h1 className={'uppercase text-4xl font-bold text-white'}>Kibershop</h1>
						{user && (
							<Link href={user.role === 'MODERATOR' ? PUBLIC_URL.admin() : PUBLIC_URL['user-panel']()}>
								<Button className={'text-lg py-5 px-7 flex duration-300 hover:scale-110'} variant={'secondary'}>
									{user.role === 'MODERATOR' ? 'Админка' : 'Личный кабинет'}
								</Button>
							</Link>
						)}
					</div>
					<div className={'text-white flex items-center gap-5 justify-end'}>
						<Link href={PUBLIC_URL.home('#products')} className={'text-lg text-black py-3.5 px-6 bg-white rounded-full uppercase font-medium border-2 border-solid border-transparent hover:bg-transparent hover:text-white hover:border-white hover:scale-105 duration-300'}>
							Кибертовары
						</Link>
						<Link href={'#'} className={'relative hover:scale-110 duration-300'}>
							<HeaderCart>
								<ShoppingCart size={40}/>
								<span className={'absolute -bottom-1 -right-2 text-xs px-1.5 py-0.5 bg-white text-darkblue rounded-full font-bold'}>
									{items.length}
								</span>
							</HeaderCart>
						</Link>
					</div>
				</div>
				{user && user.role === 'USER' && (
					<div className={'text-white mt-5 flex max-sm:flex-wrap gap-5 justify-center sm:justify-between items-center'}>
						<div className={'flex items-center gap-1'}>
							{user.image ? <Image className={'rounded-full'} src={user.image} alt={'User Avatar'} width={25} height={25}/> : <User/> }
							<span>{isLoadingUser ? "Загрузка пользователя..." : user?.name}</span>
						</div>
						<div className={'flex items-center gap-1'}>
							<Wallet />
							<span className={'font-bold'}>Текущий баланс:</span>
							<span className={'font-bold text-darkyellow'}>{isLoadingUser ? "Загрузка пользователя..." : user?.quantityMoney}</span>
						</div>
					</div>
				)}
				{user && user.role === 'USER' && (
					<div className={'flex justify-end mt-3'}>
						<Button variant={'secondary'} onClick={() => logout()}>
							<LogOut className={'size-4 mr-2'}/>
							Выйти
						</Button>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header