'use client'

import { useParams } from 'next/navigation'
import { useGetUserById } from '@/src/hooks/queries/user/useGetUserById'
import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'
import { useEffect, useState } from 'react'
import { IGroup } from '@/src/shared/types/group.types'
import { dayLesson } from '@/src/utils/group/dayLesson'
import { adminHistoryColumns, IAdminHistoryColumn } from '@/src/app/admin/users/history/[userId]/AdminHistoryColumns'
import { useGetTransactionsUser } from '@/src/hooks/queries/transaction/useGetTransactionsUser'
import { AdminDataTable } from '@/src/components/ui/data-loading/admin/AdminDataTable'
import { Button } from '@/src/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/src/components/ui/Dialog'
import { Label } from '@/src/components/ui/form-elements/Label'
import { Input } from '@/src/components/ui/form-elements/Input'
import { TransactionForm } from '@/src/app/admin/users/history/[userId]/TransactionForm'

const HistoryTransaction = () => {
	const params = useParams<{userId: string}>()
	const {transactionsUser, isLoadingTransactionsUser} = useGetTransactionsUser(params.userId)
	const {user, isLoadingUser} = useGetUserById()
	const { groups, isLoading } = useGetGroups()

	const [group, setGroup] = useState<IGroup>()

	useEffect(() => {
		if (!isLoading && !isLoadingUser) setGroup(groups!.find(group => user!.groupId === group.id))
	}, [isLoading, isLoadingUser])

	const formattedHistory: IAdminHistoryColumn[] = transactionsUser && user ? transactionsUser.map((transaction, index) => ({
		id: transaction.id,
		dateOperation: transaction.createdAt,
		description: transaction.description,
		type: transaction.type,
		quantityMoney: transaction.quantityMoney,
		balance: transaction.remains
	})) : []

	return (
		<div>
			<h2 className="title">История транзакций валюты</h2>
			<p className={'mt-3 font-medium text-xl'}>Информация о пользователе:</p>
			<p className={'text-xl mb-7'}>{isLoadingUser || !group ? 'Пользователь' : <span>{user!.lastName} {user!.firstName}, {group!.title}, {dayLesson(group!.dayOfStudy)}, {group!.startTimeLearning} - {group!.endTimeLearning}</span>}</p>
			<div className={'flex justify-between items-center mb-4'}>
				<p className={'text-base font-medium mb-2'}>Текущий баланс ученика: <span className={'font-bold'}>{isLoadingUser ? "0" : user!.quantityMoney} K</span></p>
				<Dialog>
					<DialogTrigger asChild>
						<Button className={'cursor-pointer'} variant="outline">Добавить транзакцию</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[1025px]">
						<DialogHeader>
							<DialogTitle>Добавление транзакции</DialogTitle>
						</DialogHeader>
						<TransactionForm/>
						<DialogFooter>
							<Button type="submit">Использовать транзакции</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<AdminDataTable columns={adminHistoryColumns} data={formattedHistory} className={'grid grid-cols-6'}/>
		</div>
	)
}

export default HistoryTransaction