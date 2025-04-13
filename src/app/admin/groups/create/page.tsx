import CreateGroup from '@/src/app/admin/groups/create/CreateGroup'
import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
  title: "Создание группы",
  ...NO_INDEX_PAGE
}

const Page = () => {
  return <CreateGroup/>
}

export default Page