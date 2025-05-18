import { axiosClassic, axiosWithAuth } from '@/src/api/api.interceptors'
import { IProduct, IProductInput } from '@/src/shared/types/product.types'
import { API_URL, SERVER_URL } from '@/src/config/api.config'
import { notFound } from 'next/navigation'

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
		const { data } = await axiosClassic<IProduct>({
			url: API_URL.products(`/${id}`),
			method: 'GET'
		})

		return data || {}
	}

	async create(data: IProductInput) {
		const { data: createdProduct } = await axiosWithAuth<IProductInput[]>({
			url: API_URL.products(`/`),
			method: 'POST',
			data
		})

		return createdProduct
	}

	async update(id: string, data: IProductInput) {
		const { data: updatedProduct } = await axiosWithAuth<IProductInput>({
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

	async getProductsFetchRequest(searchTerm?: string | null) {
		const url = new URL(`${SERVER_URL}/${API_URL.products()}`);

		if (searchTerm) {
			url.searchParams.append('searchTerm', searchTerm);
		}

		try {
			const response = await fetch(url.toString(), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: IProduct[] = await response.json();
			return data || [];
		} catch (error) {
			console.error('Error fetching products:', error);
			return [];
		}
	}

	async getByIdFetchRequest(id: string) {
		try {
			const response = await fetch(`http://localhost:5000${API_URL.products(`/${id}`)}`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				return notFound()
			}

			const data: IProduct = await response.json();
			return data || {} as IProduct;
		} catch (error) {
			return notFound()
		}
	}
}

export const productService = new ProductService()