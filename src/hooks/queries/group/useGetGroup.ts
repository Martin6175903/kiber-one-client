import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import { useMemo } from 'react'
import { groupService } from '@/src/services/group.service'
import { useParams } from 'next/navigation'

export const useGetGroup = (id: string) => {
  const {data: group, isLoading: isLoadingGroup} = useQuery({
    queryKey: ['get group'],
    queryFn: () => groupService.getGroup(id)
  })

  return useMemo(() => ({
    group, isLoadingGroup
  }), [group, isLoadingGroup])
}