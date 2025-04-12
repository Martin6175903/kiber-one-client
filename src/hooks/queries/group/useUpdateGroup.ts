import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import { IOrderStatus } from '@/src/shared/types/order.types'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { IGroup } from '@/src/shared/types/group.types'
import { groupService } from '@/src/services/group.service'

export const useUpdateGroup = () => {
  const queryClient = useQueryClient()

  const {mutate: updateGroup, isPending: isPendingGroup} = useMutation({
    mutationKey: ['update group'],
    mutationFn: (data: IGroup) => groupService.updateGroup(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['update group']
      })
      toast.success('Группа обновлена')
    },
    onError() {
      toast.error('Ошибка при обновлении группы')
    }
  })

  return useMemo(() => ({
    updateGroup, isPendingGroup
  }), [updateGroup, isPendingGroup])
}