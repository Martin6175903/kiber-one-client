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
	DialogClose,
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
import { useCreateTransaction } from '@/src/hooks/queries/transaction/useCreateTransaction'

const HistoryTransaction = () => {
	const user = useGetUserById()
	if (!user) {
		return <div>Пользователь не найден!</div>
	}

	const params = useParams<{userId: string}>()
	const {transactionsUser} = useGetTransactionsUser(params.userId)
	
	const group = user.group

	const { isLoadingCreateTransaction } = useCreateTransaction()

	const formattedHistory: IAdminHistoryColumn[] = transactionsUser && user ? transactionsUser.map((transaction, index) => ({
		id: transaction.id,
		dateOperation: transaction.createdAt,
		description: transaction.description,
		type: transaction.type,
		quantityMoney: transaction.quantityMoney,
		balance: transaction.remains
	})) as unknown as Array<IAdminHistoryColumn> : []

	return (
		<div>
			<h2 className="title">История транзакций валюты</h2>
			<p className={'mt-3 font-medium text-xl'}>Информация о пользователе:</p>
			<p className={'text-xl mb-7'}>{group ? <span>{user.name}, {group.title}, {dayLesson(group.dayOfStudy)}, {group.startTimeLearning} - {group.endTimeLearning}</span> : <span>{ user.name } (Группа не указана)</span>}</p>
			<div className={'flex justify-between items-center mb-4'}>
				<p className={'text-base font-medium mb-2'}>Текущий баланс ученика: <span className={'font-bold'}>{user.quantityMoney} K</span></p>
				<Dialog defaultOpen={true}>
					<DialogTrigger asChild>
						<Button disabled={isLoadingCreateTransaction} className={'cursor-pointer'} variant="outline">Добавить транзакцию</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[1025px]">
						<DialogHeader>
							<DialogTitle>Добавление транзакции</DialogTitle>
						</DialogHeader>
						<TransactionForm/>
					</DialogContent>
				</Dialog>
			</div>
			<AdminDataTable columns={adminHistoryColumns} data={formattedHistory} className={'grid grid-cols-6'} keySort={'dateOperation'} />
		</div>
	)
}

export default HistoryTransaction