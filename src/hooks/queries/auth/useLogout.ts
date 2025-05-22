import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/src/services/auth/auth.service'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: logout, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['get current user'], null)
    }
  })

  return useMemo(() => ({
    logout, isPending
  }), [logout, isPending])
}