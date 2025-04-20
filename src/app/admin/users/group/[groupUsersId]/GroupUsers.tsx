'use client'

import { useParams } from 'next/navigation'
import AdminUsersColumns, { IAdminUsersColumn } from '@/src/app/admin/users/AdminUsersColumns'
import { useGetGroup } from '@/src/hooks/queries/group/useGetGroup'
import { useGetUsers } from '@/src/hooks/queries/user/useGetUsers'
import { AdminDataTable } from '@/src/components/ui/data-loading/admin/AdminDataTable'

const GroupUsers = () => {
	const params = useParams<{ groupUsersId: string }>()
	const {group, isLoadingGroup} = useGetGroup(params.groupUsersId)
	const {users, isLoadingUsers} = useGetUsers()

	const formattedUsers: IAdminUsersColumn[] = isLoadingUsers ? [] : users!.filter(user => user.role && user.groupId === params.groupUsersId).map((user, index) => ({
		id: { generateId: index + 1, id: user.id },
		fullName: (user.lastName + ' ' + user.firstName),
		groupTitle: isLoadingGroup ? '' : group!.title,
		balance: user.quantityMoney
	}))
	return (
		<div>
			<h2 className="title">Ученики</h2>
			<h4 className={'font-medium'}>{isLoadingGroup ? '' : group!.title}</h4>
			<AdminDataTable columns={AdminUsersColumns} data={formattedUsers} filterKey={'fullName'} className={'grid grid-cols-[0.5fr_1.5fr_2fr_1fr_0.7fr] justify-center items-center'}/>
		</div>
	)
}

export default GroupUsers