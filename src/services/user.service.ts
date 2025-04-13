import { axiosClassic, axiosWithAuth } from '@/src/api/api.interceptors'
import { IUser } from '@/src/shared/types/user.types'
import { API_URL } from '@/src/config/api.config'

class UserService {
	async getProfile() {
		const { data } = await axiosWithAuth<IUser>({
			url: API_URL.users('/profile'),
			method: 'GET'
		})
		return data
	}

	async getUsers() {
		const {data} = await axiosClassic<IUser[]>({
			url: API_URL.users('/'),
			method: "GET"
		})
		return data
	}
}

export const userService = new UserService()