import SettingsCity from '@/src/app/admin/settings-city/SettingsCity'
import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Настройка города',
	...NO_INDEX_PAGE
}

const Page = () => {
	return <SettingsCity />
}

export default Page
