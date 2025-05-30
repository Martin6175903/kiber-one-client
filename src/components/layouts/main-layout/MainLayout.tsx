'use client'
import { PropsWithChildren, useEffect } from 'react'
import Header from '@/src/components/layouts/main-layout/header/Header'
import Footer from '@/src/components/layouts/main-layout/footer/Footer'
import { usePathname, useRouter } from 'next/navigation'
import { useUserContext } from '@/src/providers/user.context'
import { PUBLIC_URL } from '@/src/config/url.config'

const MainLayout = ({children} :PropsWithChildren ) => {
	const pathname = usePathname()
	const router = useRouter()
	const {user, isLoadingUser} = useUserContext()

	useEffect(() => {
		if (!isLoadingUser && !user) router.push(PUBLIC_URL.auth())
	}, [isLoadingUser, user, pathname])

	useEffect(() => {
		if (!isLoadingUser && user?.role === 'USER' && pathname.includes(PUBLIC_URL.auth())) router.replace(PUBLIC_URL.home())
	}, [isLoadingUser, user, pathname])

	return (
		<div className="wrapper flex flex-col justify-between min-h-full">
			<div className={'h-full flex-[1_0_auto]'}>
				<Header/>
				<main className={'h-full'}>{children}</main>
			</div>
			<Footer/>
		</div>
	);
};

export default MainLayout