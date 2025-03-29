import { PropsWithChildren } from 'react'
import Header from '@/src/components/layouts/main-layout/header/Header'
import Footer from '@/src/components/layouts/main-layout/footer/Footer'

const MainLayout = ({children} :PropsWithChildren ) => {
	return (
		<div className="wrapper flex flex-col justify-between h-full">
			<div>
				<Header/>
				<main className={'h-full'}>{children}</main>
			</div>
			<Footer/>
		</div>
	);
};

export default MainLayout