import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { groupService } from '@/src/services/group.service'
import { transactionService } from '@/src/services/transaction.service'

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  const {mutate: deleteTransaction, isPending: isLoadingDeleteTransaction, isSuccess: isSuccessDeleted} = useMutation({
    mutationKey: ['delete transaction'],
    mutationFn: (id: string) => transactionService.deleteTransaction(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get transactions user']
      })
      toast.success('Транзакция успешно удалена')
    },
    onError() {
      toast.error('Ошибка при удалении транзакции')
    }
  })

  return useMemo(() => ({
    deleteTransaction, isLoadingDeleteTransaction, isSuccessDeleted
  }), [deleteTransaction, isLoadingDeleteTransaction, isSuccessDeleted])
}