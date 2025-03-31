import { axiosClassic, axiosWithAuth } from '@/src/api/api.interceptors'
import { IProduct } from '@/src/shared/types/product.types'
import { API_URL } from '@/src/config/api.config'

class ProductService {
	async getAll(searchTerm?: string | null) {
		const { data } = await axiosClassic<IProduct[]>({
			url: API_URL.products(),
			method: 'GET',
			params: searchTerm ? {searchTerm} : {}
		})

		return data || []
	}

	async getById(id: string) {
		const { data } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`/${id}`),
			method: 'GET'
		})

		return data || []
	}

	async create(data: IProduct) {
		const { data: createdProduct } = await axiosWithAuth<IProduct[]>({
			url: API_URL.products(`/`),
			method: 'POST',
			data
		})

		return createdProduct
	}

	async update(id: string, data: IProduct) {
		const { data: updatedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`/${id}`),
			method: 'PUT',
			data
		})

		return updatedProduct
	}

	async delete(id: string) {
		const { data: deletedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`/${id}`),
			method: 'DELETE'
		})

		return deletedProduct
	}
}

export const productService = new ProductService()