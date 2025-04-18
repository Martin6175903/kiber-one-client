'use client'
import { GroupsTable } from '@/src/app/admin/groups/GroupsTable'
import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'
import { Button } from '@/src/components/ui/Button'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'

const Groups = () => {
  const { groups, isLoading } = useGetGroups()
  const router = useRouter()

  return (
    <div>
      <h2 className="title mb-10">Группы</h2>
      <GroupsTable groups={isLoading ? [] : groups}/>
      <Button className={'mt-5 cursor-pointer'} onClick={() => router.push(PUBLIC_URL.admin('/groups/create'))}>Создать новую группу</Button>
    </div>
  )
}

export default Groups