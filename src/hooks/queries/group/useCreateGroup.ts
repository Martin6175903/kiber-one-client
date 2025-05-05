import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { PUBLIC_URL } from '@/src/config/url.config'
import { groupService } from '@/src/services/group.service'
import { IGroup } from '@/src/shared/types/group.types'

export const useCreateGroup = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutate: createGroup, isPending: isLoadingCreateGroup } = useMutation({
		mutationKey: ['create group'],
		mutationFn: (data: IGroup) => groupService.createGroup(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get group']
			})
			toast.success('Группа успешно создана!')
			router.push(PUBLIC_URL.admin('/groups'))
		},
		onError() {
			toast.error('Ошибка при создании группы!')
		}
	})

	return useMemo(
		() => ({
			createGroup,
			isLoadingCreateGroup
		}),
		[createGroup, isLoadingCreateGroup]
	)
}
