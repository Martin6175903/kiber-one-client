import { axiosWithAuth } from '@/src/api/api.interceptors'
import { IUser } from '@/src/shared/types/user.types'
import { API_URL } from '@/src/config/api.config'

class UserService {
	async getProfile() {
		const response = await axiosWithAuth<IUser>({
			url: API_URL.users('/profile'),
			method: 'GET'
		})
		return response
	}
}