import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './global.css'
import { SITE_DESCRIPTION, SITE_NAME } from '@/src/constants/seo.constants'
import React from 'react'
import Providers from '@/src/app/providers'

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION
}

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin']
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${roboto.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
