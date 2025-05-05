'use client'
import Logo from '@/src/components/layouts/main-layout/header/logo/Logo'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useGetCities } from '@/src/hooks/queries/city/useGetCities'

const AsideHeader = () => {
	const { cities, isCitiesLoading } = useGetCities()
	return (
		<div>
			<div className={'flex gap-3 items-center text-sm justify-center'}>
				<Logo link={PUBLIC_URL.home()} className={'w-[100px]'} />
				<div>
					<p className={'font-bold text-base'}>
						г.{' '}
						{isCitiesLoading
							? 'Неизвестен'
							: isCitiesLoading
								? 'Неизвестно'
								: cities?.length
									? cities[0].city
									: 'Неизвестно'}
					</p>
				</div>
			</div>
			<div className={'my-3 h-1.5 bg-[#131313]'} />
		</div>
	)
}

export default AsideHeader
