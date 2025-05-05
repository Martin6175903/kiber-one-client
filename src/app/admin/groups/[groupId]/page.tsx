import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'
import GroupEdit from '@/src/app/admin/groups/[groupId]/GroupEdit'

export const metadata: Metadata = {
	title: 'Редактирование группы',
	...NO_INDEX_PAGE
}

const Page = () => {
	return <GroupEdit />
}

export default Page
