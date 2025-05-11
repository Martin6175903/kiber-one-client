'use client'

import { createContext, useContext } from 'react'
import { IUser } from '@/src/shared/types/user.types'

type UserContextType = {
	user: IUser | null
	isLoadingUser: boolean
}

export const UserContext = createContext<UserContextType>({
	user: null,
	isLoadingUser: false,
})

export const useUserContext = () => useContext(UserContext)