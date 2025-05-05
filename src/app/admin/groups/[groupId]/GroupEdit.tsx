'use client'

import { useParams } from 'next/navigation'
import { useGetGroup } from '@/src/hooks/queries/group/useGetGroup'
import GroupForm from '@/src/app/admin/groups/GroupForm'

const GroupEdit = () => {
	const params = useParams<{ groupId: string }>()
	const { group, isLoadingGroup } = useGetGroup(params.groupId)
	return <GroupForm group={group} />
}

export default GroupEdit
