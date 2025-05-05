import Image from 'next/image'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { SITE_NAME } from '@/src/constants/seo.constants'
import { ComponentProps } from 'react'

interface LogoProps extends ComponentProps<'a'> {
	link?: string
	className?: string
}

const Logo = ({ link, className, ...props }: LogoProps) => {
	return (
		<Link
			{...props}
			className={`inline-block hover:opacity-75 hover:scale-110 duration-300 ${className ? className : ''}`}
			href={link ? link : PUBLIC_URL.home()}
		>
			<Image src={'/images/Logo.svg'} alt={SITE_NAME} width={150} height={73} />
		</Link>
	)
}

export default Logo
