import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/src/services/order.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { groupService } from '@/src/services/group.service'

export const useDeleteGroup = () => {
  const queryClient = useQueryClient()

  const {mutate: deleteGroup, isPending: isLoadingDeleteGroup, isSuccess: isSuccessDeleted} = useMutation({
    mutationKey: ['delete group'],
    mutationFn: (id: string) => groupService.deleteGroup(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get groups']
      })
      toast.success('Группа успешно удалена')
    },
    onError() {
      toast.error('Ошибка при удалении группы')
    }
  })

  return useMemo(() => ({
    deleteGroup, isLoadingDeleteGroup, isSuccessDeleted
  }), [deleteGroup, isLoadingDeleteGroup, isSuccessDeleted])
}