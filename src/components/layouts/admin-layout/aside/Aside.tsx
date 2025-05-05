'use client'
import AsideHeader from '@/src/components/layouts/admin-layout/aside/header/AsideHeader'
import AsideNavbar from '@/src/components/layouts/admin-layout/aside/navbar/AsideNavbar'
import { usePathname } from 'next/navigation'

const Aside = () => {
	const pathname = usePathname()

	return (
		<div
			className={
				'min-w-[300px] w-[300px] min-h-screen bg-yellow-500/95 text-white py-5'
			}
		>
			<AsideHeader />
			<AsideNavbar />
		</div>
	)
}

export default Aside
