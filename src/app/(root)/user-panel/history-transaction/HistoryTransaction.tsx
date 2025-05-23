'use client'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'
import { useUserContext } from '@/src/providers/user.context'

const HistoryTransaction = () => {
	const { user } = useUserContext()
	return (
		<div className={'h-full mt-8 text-black flex items-center'}>
			<div className={'container'}>
				<div className={'flex flex-col gap-7'}>
					<div className={'flex justify-between items-center'}>
						<h1 className={'text-4xl font-bold'}>Личный кабинет</h1>
						<Link className={'duration-300 hover:scale-105'} href={PUBLIC_URL.home()}>
							<Button>История операций</Button>
						</Link>
					</div>

				</div>
			</div>
		</div>
	)
}

export default HistoryTransaction