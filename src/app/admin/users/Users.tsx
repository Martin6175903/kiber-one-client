'use client'
import { IProductsColumn } from '@/src/app/(root)/products/ProductsColumn'
import { useGetUsers } from '@/src/hooks/queries/user/useGetUsers'
import AdminUsersColumns, { IAdminUsersColumn } from '@/src/app/admin/users/AdminUsersColumns'
import { AdminDataTable } from '@/src/components/ui/data-loading/admin/AdminDataTable'

const Users = () => {
  const { users, isLoadingUsers } = useGetUsers()

  const formattedUsers: IAdminUsersColumn[] = users ? users.filter(user => user.moderator).map((user, index) => ({
    id: index + 1,
    fullName: (user.lastName + ' ' + user.firstName),
    groupTitle: '',
    balance: user.quantity_money!
  })) : []

  return (
    <div>
      <h2 className="title mb-5">Пользователи</h2>
      <AdminDataTable columns={AdminUsersColumns} data={isLoadingUsers ? [] : formattedUsers!} filterKey={'fullName'}/>
    </div>
  )
}

export default Users