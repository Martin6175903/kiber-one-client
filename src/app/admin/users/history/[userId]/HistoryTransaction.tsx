'use client'

import { useParams } from 'next/navigation'
import { useGetUserById } from '@/src/hooks/queries/user/useGetUserById'
import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'
import { useEffect, useState } from 'react'
import { IGroup } from '@/src/shared/types/group.types'
import { dayLesson } from '@/src/utils/group/dayLesson'

const HistoryTransaction = () => {
	const {user, isLoadingUser} = useGetUserById()
	const {groups, isLoading} = useGetGroups()
	const [group, setGroup] = useState<IGroup>(isLoadingUser && isLoading ? {} : groups.find(group => group.id === user.groupId))

	return (
		<div>
			<h2 className="title">История транзакций валюты</h2>
			<p className={'mt-3 font-medium text-xl'}>Информация о пользователе:</p>
			<p className={'text-xl'}>{isLoadingUser ? 'Пользователь' : <span>{user!.lastName} {user!.firstName}, {group!.title}, {dayLesson(group!.dayOfStudy)}, {group!.startTimeLearning} - {group!.endTimeLearning}</span>}</p>
		</div>
	)
}

export default HistoryTransaction