import { ITransaction } from '@/src/shared/types/transaction.types'
import { axiosClassic } from '@/src/api/api.interceptors'
import { API_URL } from '@/src/config/api.config'

class TransactionService {
	async createTransaction(data: ITransaction[]) {
		return axiosClassic<ITransaction[]>({
			url: API_URL.transaction('/'),
			method: 'POST',
			data
		})
	}

	async getTransactions() {
		const {data} = await axiosClassic<ITransaction[]>({
			url: API_URL.transaction('/'),
			method: 'GET'
		})
		return data
	}

	async getTransactionsUser(id: string) {
		const {data} = await axiosClassic<ITransaction[]>({
			url: API_URL.transaction(`/${id}`),
			method: 'GET'
		})
		return data;
	}

	async deleteTransaction(id: string) {
		return axiosClassic<ITransaction>({
			url: API_URL.transaction(`/${id}`),
			method: 'DELETE'
		})
	}
}

export const transactionService = new TransactionService()

