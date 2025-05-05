import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { groupService } from '@/src/services/group.service'
import { transactionService } from '@/src/services/transaction.service'

export const useGetTransactions = () => {
	const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
		queryKey: ['get transactions'],
		queryFn: () => transactionService.getTransactions()
	})

	return useMemo(
		() => ({
			transactions,
			isLoadingTransactions
		}),
		[transactions, isLoadingTransactions]
	)
}
