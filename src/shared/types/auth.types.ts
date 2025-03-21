import { IUser } from '@/src/shared/types/user.types'

export interface IAuthForm  {
	email: string
	password: string
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}