'use client'
import { PropsWithChildren } from 'react'
import { useGetCurrentUser } from '@/src/hooks/queries/auth/useGetCurrentUser'
import { UserContext } from './user.context'

const UserProvider = ({ children }: PropsWithChildren) => {
	const { currentUser, isPendingUser } = useGetCurrentUser()

	return (
		<UserContext.Provider
			value={{
				user: currentUser || null,
				isLoadingUser: isPendingUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider