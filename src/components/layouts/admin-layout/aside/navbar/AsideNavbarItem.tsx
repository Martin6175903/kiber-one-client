'use client'
import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useLogout } from '@/src/hooks/queries/auth/useLogout'

interface AsideNavbarItemProps {
	title: string
	link: string
	icon: ReactNode
}

const AsideNavbarItem = ({ title, link, icon }: AsideNavbarItemProps) => {
	const { logout } = useLogout()
	const pathname = usePathname()
	return (
		<li>
			<Link
				onClick={e => {
					if (link.includes('auth')) logout()
				}}
				href={link.includes('auth') ? '#' : link}
				className={`${pathname.includes(link) ? 'bg-darkblue/85 hover:bg-darkblue/70' : 'hover:bg-darkblue/75'} flex gap-3 items-center text-sm font-bold py-2.5 pl-3 duration-300 hover:scale-95 rounded-lg`}
			>
				<p>{icon}</p>
				{title}
			</Link>
		</li>
	)
}

export default AsideNavbarItem
