import {
	ITransaction,
	ITransactionDelete,
	ITransactionInput
} from '@/src/shared/types/transaction.types'
import { axiosClassic } from '@/src/api/api.interceptors'
import { API_URL } from '@/src/config/api.config'

class TransactionService {
	async createTransaction(userId: string, data: ITransactionInput[]) {
		return axiosClassic<ITransaction[]>({
			url: API_URL.transaction(`/${userId}`),
			method: 'POST',
			data
		})
	}

	async getTransactions() {
		const { data } = await axiosClassic<ITransaction[]>({
			url: API_URL.transaction('/'),
			method: 'GET'
		})
		return data
	}

	async getTransactionsUser(id: string) {
		const { data } = await axiosClassic<ITransaction[]>({
			url: API_URL.transaction(`/${id}`),
			method: 'GET'
		})
		return data
	}

	async deleteTransaction(data: ITransactionDelete) {
		return axiosClassic<ITransactionDelete>({
			url: API_URL.transaction(`/${data.id}`),
			method: 'DELETE',
			data: {
				type: data.type,
				quantityMoney: data.quantityMoney,
				userId: data.userId
			}
		})
	}
}

export const transactionService = new TransactionService()
