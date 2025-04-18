'use client'
import UserForm from '@/src/app/admin/users/UserForm'
import { useGetUserById } from '@/src/hooks/queries/user/useGetUserById'

const EditUser = () => {
  const { user, isLoadingUser } = useGetUserById()
  return <UserForm user={!isLoadingUser ? user : null}/>
}

export default EditUser