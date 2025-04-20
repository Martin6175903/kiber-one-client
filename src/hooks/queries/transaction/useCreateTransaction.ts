import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { ITransaction } from '@/src/shared/types/transaction.types'
import { transactionService } from '@/src/services/transaction.service'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  const { mutate: createTransaction, isPending: isLoadingCreateTransaction } = useMutation({
    mutationKey: ['create transaction'],
		mutationFn: (data: ITransaction[]) => transactionService.createTransaction(data),
		onSuccess(){
      queryClient.invalidateQueries({
        queryKey: ['get transactions user']
      })
      toast.success('Транзакция успешно создана!')
    },
		onError() {
      toast.error('Ошибка при создании транзакции!')
    }
  })

  return useMemo(() => ({
		createTransaction, isLoadingCreateTransaction
  }), [createTransaction, isLoadingCreateTransaction])
}