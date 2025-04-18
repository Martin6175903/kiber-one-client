import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IUser, IUserInput } from '@/src/shared/types/user.types'
import { userService } from '@/src/services/user.service'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useMemo } from 'react'

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {mutate: createUser, isPending: isPendingUser} = useMutation({
    mutationKey: ['create user'],
    mutationFn: (data: IUserInput) => userService.createUser(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get users']
      })
      toast.success('Пользователь успешно создан!')
      router.push(PUBLIC_URL.admin('/users'))
    },
    onError() {
      toast.error('Ошибка при создании пользователя!')
    }
  })

  return useMemo(() => ({
    createUser, isPendingUser
  }), [createUser, isPendingUser])
}