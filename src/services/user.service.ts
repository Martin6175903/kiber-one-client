import { axiosClassic, axiosWithAuth } from '@/src/api/api.interceptors'
import { IUser, IUserInput } from '@/src/shared/types/user.types'
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

	async getUserById(id: string) {
		const {data} = await axiosClassic<IUser>({
			url: API_URL.users(`/${id}`),
			method: 'GET'
		})
		return data
	}

	async createUser(data: IUserInput) {
		return axiosClassic<IUserInput>({
			url: API_URL.users('/'),
			method: 'POST',
			data
		})
	}

	async updateUser(data: IUserInput, id: string) {
		return axiosClassic<IUserInput>({
			url: API_URL.users(`/${id}`),
			method: 'PUT',
			data
		})
	}

	async deleteUser(id: string) {
		return axiosClassic<IUserInput>({
			url: API_URL.users(`/${id}`),
			method: 'DELETE'
		})
	}
}

export const userService = new UserService()