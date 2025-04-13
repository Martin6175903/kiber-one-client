import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import { IOrderStatus } from '@/src/shared/types/order.types'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { IGroup } from '@/src/shared/types/group.types'
import { groupService } from '@/src/services/group.service'
import { PUBLIC_URL } from '@/src/config/url.config'

export const useUpdateGroup = (id: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {mutate: updateGroup, isPending: isPendingGroup} = useMutation({
    mutationKey: ['update group'],
    mutationFn: (data: IGroup) => groupService.updateGroup(data, id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get group']
      })
      toast.success('Группа обновлена')
      router.push(PUBLIC_URL.admin('/groups'))
    },
    onError() {
      toast.error('Ошибка при обновлении группы')
    }
  })

  return useMemo(() => ({
    updateGroup, isPendingGroup
  }), [updateGroup, isPendingGroup])
}