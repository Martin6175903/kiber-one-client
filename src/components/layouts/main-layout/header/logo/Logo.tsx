import Image from 'next/image'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { SITE_NAME } from '@/src/constants/seo.constants'

const Logo = () => {
	return (
		<Link className={'hover:opacity-75 transition-opacity'} href={PUBLIC_URL.home()}>
			<Image src={'/images/Logo.svg'} alt={SITE_NAME} width={182} height={87}/>
		</Link>
	)
}

export default Logo