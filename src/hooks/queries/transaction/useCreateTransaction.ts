import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { ITransaction, ITransactionInput } from '@/src/shared/types/transaction.types'
import { transactionService } from '@/src/services/transaction.service'
import { useParams, useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useUserContext } from '@/src/providers/user.context'

export const useCreateTransaction = () => {
	const params = useParams<{ userId: string }>()
	const queryClient = useQueryClient()
	const router = useRouter()
	const {user} = useUserContext()

  const { mutate: createTransaction, isPending: isLoadingCreateTransaction } = useMutation({
    mutationKey: ['create transaction'],
		mutationFn: (data: ITransactionInput[]) => transactionService.createTransaction(params.userId || user!.id, data),
		onSuccess(){
      Promise.all([
				queryClient.invalidateQueries({ queryKey: ['get transactions user'] }),
				queryClient.invalidateQueries({ queryKey: ['get user by id', params.userId] })
			])
      toast.success('Транзакция успешно создана!')
			router.push(PUBLIC_URL.admin('/users'))
    },
		onError() {
      toast.error('Ошибка при создании транзакции!')
    }
  })

  return useMemo(() => ({
		createTransaction, isLoadingCreateTransaction
  }), [createTransaction, isLoadingCreateTransaction])
}