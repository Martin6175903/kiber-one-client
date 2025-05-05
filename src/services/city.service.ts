import { axiosClassic } from '@/src/api/api.interceptors'
import { API_URL } from '@/src/config/api.config'

class CityService {
	async getCities() {
		const { data: getCities } = await axiosClassic<ICity[]>({
			url: API_URL.city('/'),
			method: 'GET'
		})
		return getCities
	}

	async createCity(data: ICity) {
		const { data: createdCity } = await axiosClassic<ICity>({
			url: API_URL.city('/'),
			method: 'POST',
			data
		})

		return createdCity
	}

	async updateCite(data: ICity) {
		const { data: updatedCity } = await axiosClassic<ICity>({
			url: API_URL.city(`/${data.id}`),
			method: 'PUT',
			data
		})
		return updatedCity
	}
}

export const cityService = new CityService()
