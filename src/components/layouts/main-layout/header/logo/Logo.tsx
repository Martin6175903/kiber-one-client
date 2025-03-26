import Image from 'next/image'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { SITE_NAME } from '@/src/constants/seo.constants'

const Logo = () => {
	return (
		<Link className={'inline-block hover:opacity-75 hover:scale-110 duration-300'} href={PUBLIC_URL.home()}>
			<Image src={'/images/Logo.svg'} alt={SITE_NAME} width={150} height={73}/>
		</Link>
	)
}

export default Logo