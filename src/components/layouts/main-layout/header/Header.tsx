import Logo from '@/src/components/layouts/main-layout/header/logo/Logo'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import HeaderCart from '@/src/components/layouts/main-layout/header/header-cart/HeaderCart'

const Header = () => {
	return (
		<header className={'pt-6 pb-9 bg-linear-[-85deg,#202020_0%,#0C0C0C_40%,#1B1818_50%,#080808_60%,#202020_100%]'}>
			<div className="container">
				<div className={'relative flex justify-between items-center'}>
					<Logo/>
					<h1 className={'uppercase text-4xl font-bold text-white absolute top-1/2 left-1/2 -translate-[50%]'}>Kibershop</h1>
					<div className={'text-white flex items-center gap-5 justify-end'}>
						<Link href={'#'} className={'text-lg text-black py-3.5 px-6 bg-white rounded-full uppercase font-medium border-2 border-solid border-transparent hover:bg-transparent hover:text-white hover:border-white hover:scale-105 duration-300'}>
							Кибертовары
						</Link>
						<Link href={'#'} className={'relative hover:scale-110 duration-300'}>
							<HeaderCart>
								<ShoppingCart size={40}/>
								<span className={'absolute -bottom-1 -right-2 text-xs px-1.5 py-0.5 bg-white text-darkblue rounded-full font-bold'}>
								{0}
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