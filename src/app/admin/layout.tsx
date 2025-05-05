import AdminLayout from '@/src/components/layouts/admin-layout/AdminLayout'
import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Личный кабинет Kiber-one',
	description: 'Личный кабинет Kiber-one - Личный кабинет'
}

const Layout = ({ children }: PropsWithChildren) => {
	return <AdminLayout>{children}</AdminLayout>
}

export default Layout
