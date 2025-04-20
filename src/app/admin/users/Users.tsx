'use client'
import { useGetUsers } from '@/src/hooks/queries/user/useGetUsers'
import AdminUsersColumns, { IAdminUsersColumn } from '@/src/app/admin/users/AdminUsersColumns'
import { AdminDataTable } from '@/src/components/ui/data-loading/admin/AdminDataTable'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'
import { useGetGroup } from '@/src/hooks/queries/group/useGetGroup'
import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'

const Users = () => {
  const { users, isLoadingUsers } = useGetUsers()
	const router = useRouter()
	const {groups, isLoading} = useGetGroups()

  const formattedUsers: IAdminUsersColumn[] = users ? users.filter(user => user.role).map((user, index) => ({
    id: { generateId: index + 1, id: user.id },
    fullName: (user.lastName + ' ' + user.firstName),
    groupTitle: groups && groups.filter(group => user.groupId === group.id)[0]?.title,
    balance: user.quantityMoney
  })) : []

  return (
    <div>
      <h2 className="title">Пользователи</h2>
			<Button onClick={() => router.push(PUBLIC_URL.admin('/users/create'))} className={'my-5'}>Создать пользователя</Button>
      <AdminDataTable columns={AdminUsersColumns} data={isLoadingUsers ? [] : formattedUsers} filterKey={'fullName'} className={'grid grid-cols-[0.5fr_1.5fr_2fr_1fr_0.7fr] justify-center items-center'}/>
    </div>
  )
}

export default Users