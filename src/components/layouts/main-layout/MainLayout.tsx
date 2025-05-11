'use client'
import { PropsWithChildren, useEffect } from 'react'
import Header from '@/src/components/layouts/main-layout/header/Header'
import Footer from '@/src/components/layouts/main-layout/footer/Footer'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/src/providers/user.context'
import { PUBLIC_URL } from '@/src/config/url.config'

const MainLayout = ({children} :PropsWithChildren ) => {
	const router = useRouter()
	const {user, isLoadingUser} = useUserContext()

	useEffect(() => {
		if (!isLoadingUser && user?.role === 'USER') router.replace(PUBLIC_URL.home())
	}, [isLoadingUser])
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