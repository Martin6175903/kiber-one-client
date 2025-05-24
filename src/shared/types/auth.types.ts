import { IUser } from '@/src/shared/types/user.types'

export interface IAuthForm  {
	numberCard: string
	password: string
}

export interface IAuthResponse {
	user: IUser
}