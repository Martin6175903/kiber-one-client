import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { transactionService } from '@/src/services/transaction.service'

export const useGetTransactionsUser = (id: string) => {
	const { data: transactionsUser, isLoading: isLoadingTransactionsUser } =
		useQuery({
			queryKey: ['get transactions user'],
			queryFn: () => transactionService.getTransactionsUser(id)
		})

	return useMemo(
		() => ({
			transactionsUser,
			isLoadingTransactionsUser
		}),
		[transactionsUser, isLoadingTransactionsUser]
	)
}
