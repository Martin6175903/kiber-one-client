'use client'
import { PropsWithChildren } from 'react'
import Header from '@/src/components/layouts/main-layout/header/Header'
import Footer from '@/src/components/layouts/main-layout/footer/Footer'

const MainLayout = ({children} :PropsWithChildren ) => {
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