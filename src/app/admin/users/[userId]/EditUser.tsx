'use client'
import UserForm from '@/src/app/admin/users/UserForm'
import { useGetUserById } from '@/src/hooks/queries/user/useGetUserById'

const EditUser = () => {
	const user = useGetUserById()

	if (!user) {
		return <div>Пользователь не найден!</div>
	}

	return <UserForm user={user} />
}

export default EditUser
