'use client'

import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'

const GroupsTable = () => {
  const {groups, isLoading} = useGetGroups()
  return (
    <div>

    </div>
  )
}

export default GroupsTable