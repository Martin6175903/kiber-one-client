import { useSuspenseQuery } from '@tanstack/react-query'
import { userService } from '@/src/services/user.service'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'

export const useGetUserById = () => {
  const params = useParams<{userId: string}>()
  const {data: user, isLoading: isLoadingUser} = useSuspenseQuery({
    queryKey: ['get user by id', params.userId],
    queryFn: () => userService.getUserById(params.userId)
  })

  return user;
}