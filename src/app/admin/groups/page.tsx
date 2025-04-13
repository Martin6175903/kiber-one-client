import Groups from '@/src/app/admin/groups/Groups'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Группы Kiber-one",
  description: "Группы Kiber-one"
}

const Page = () => {
  return <Groups/>
}

export default Page