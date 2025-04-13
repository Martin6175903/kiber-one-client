import { useQuery } from '@tanstack/react-query'
import { userService } from '@/src/services/user.service'
import { useMemo } from 'react'

export const useGetUsers = () => {
  const {data: users, isLoading: isLoadingUsers} = useQuery({
    queryKey: ['get users'],
    queryFn: () => userService.getUsers()
  })

  return useMemo(() => ({
    users, isLoadingUsers
  }), [users, isLoadingUsers])
}