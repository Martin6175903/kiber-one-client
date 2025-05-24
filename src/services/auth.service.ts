import { IAuthForm } from '@/src/shared/types/auth.types'
import { axiosClassic, axiosWithAuth } from '@/src/api/api.interceptors'
import { API_URL } from '@/src/config/api.config'
import { IUser } from '@/src/shared/types/user.types'

class AuthService {
	async main(data: IAuthForm) {
		return await axiosClassic<IUser>({
			url: API_URL.auth(`/login`),
			method: 'POST',
			data
		})
	}

	async getCurrentUser() {
		const response = await axiosClassic({
			url: API_URL.auth(),
			method: 'GET'
		})
		return response.data
	}

	async validateSession() {
		return await axiosClassic<IAuthForm>({
			url: API_URL.auth('/validate-user'),
			method: 'GET'
		})
	}

	async changePassword(password: string, id: string) {
		return await axiosWithAuth<string>({
			url: API_URL.auth(`/change-password/${id}`),
			method: 'PATCH',
			data: { password }
		})
	}

	async logout() {
		return await axiosClassic<boolean>({
			url: API_URL.auth(`/logout`),
			method: 'POST'
		})
	}
}

export const authService = new AuthService()