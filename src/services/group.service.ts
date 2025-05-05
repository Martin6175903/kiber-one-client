import { axiosClassic, axiosWithAuth } from '@/src/api/api.interceptors'
import { API_URL } from '@/src/config/api.config'
import { IGroup } from '@/src/shared/types/group.types'

class GroupService {
	async createGroup(data: IGroup) {
		return axiosWithAuth<IGroup>({
			url: API_URL.group('/'),
			method: 'POST',
			data
		})
	}

	async getGroups() {
		const { data } = await axiosWithAuth<IGroup[]>({
			url: API_URL.group('/'),
			method: 'GET'
		})
		return data
	}

	async getGroup(id: string) {
		const { data } = await axiosClassic<IGroup>({
			url: API_URL.group(`/${id}`),
			method: 'GET'
		})
		return data
	}

	async updateGroup(data: IGroup, id: string) {
		const { data: updatedOrderStatus } = await axiosWithAuth<IGroup>({
			url: API_URL.group(`/${id}`),
			method: 'PUT',
			data
		})

		return updatedOrderStatus
	}

	async deleteGroup(id: string) {
		return axiosWithAuth<IGroup>({
			url: API_URL.group(`/${id}`),
			method: 'DELETE'
		})
	}
}

export const groupService = new GroupService()
