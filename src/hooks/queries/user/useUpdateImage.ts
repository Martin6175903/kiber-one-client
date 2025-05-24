import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/src/services/user.service'
import { useUserContext } from '@/src/providers/user.context'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useUpdateImage = () => {
	const queryClient = useQueryClient()
	const { user } = useUserContext()

	const { mutate: updateImage, isPending: isPendingUpdateImage } = useMutation({
		mutationKey: ['update image'],
		mutationFn: (image: string) => userService.updateImage(user!.id, image),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get current user']
			})
			toast.success('Изображение обновлено!')
		},
		onError() {
			toast.error('Ошибка при обновлении изображения!')
		}
	})

	return useMemo(() =>
		({ updateImage, isPendingUpdateImage }),
	[updateImage, isPendingUpdateImage])
}