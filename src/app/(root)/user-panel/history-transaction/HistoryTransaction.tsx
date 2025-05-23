'use client'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'
import { useUserContext } from '@/src/providers/user.context'
import { useGetUserById } from '@/src/hooks/queries/user/useGetUserById'
import { useParams } from 'next/navigation'
import { useGetTransactionsUser } from '@/src/hooks/queries/transaction/useGetTransactionsUser'
import { useCreateTransaction } from '@/src/hooks/queries/transaction/useCreateTransaction'
import { adminHistoryColumns, IAdminHistoryColumn } from '@/src/app/admin/users/history/[userId]/AdminHistoryColumns'
import { dayLesson } from '@/src/utils/group/dayLesson'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/Dialog'
import { TransactionForm } from '@/src/app/admin/users/history/[userId]/TransactionForm'
import { AdminDataTable } from '@/src/components/ui/data-loading/admin/AdminDataTable'
import { useGetGroup } from '@/src/hooks/queries/group/useGetGroup'
import UserHistoryColumns from '@/src/app/(root)/user-panel/history-transaction/UserHistoryColumns'

const HistoryTransaction = () => {
	const { user } = useUserContext()
	console.log(user)

	const {transactionsUser} = useGetTransactionsUser(user ? user.id : '')
	const {group} = useGetGroup(user ? user.id : '')

	const formattedHistory: IAdminHistoryColumn[] = transactionsUser && user ? transactionsUser.map((transaction, index) => ({
		id: transaction.id,
		dateOperation: transaction.createdAt,
		description: transaction.description,
		type: transaction.type,
		quantityMoney: transaction.quantityMoney,
		balance: transaction.remains
	})) as unknown as Array<IAdminHistoryColumn> : []

	return (
		<div className={'container'}>
			<div className={'mt-5'}>
				<h2 className="title">История транзакций валюты</h2>
				<p className={'mt-3 font-medium text-xl'}>Информация о вас:</p>
				<p className={'text-xl mb-7'}>{user ? <span>{user.name}, {user.group.title}, {dayLesson(user.group.dayOfStudy)}, {user.group.startTimeLearning} - {user.group.endTimeLearning}</span> : <span>{ user && user.name } (Группа не указана)</span>}</p>
				<AdminDataTable columns={UserHistoryColumns} data={formattedHistory} className={'grid grid-cols-[0.8fr_2fr_1fr_1fr_1fr]'} keySort={'dateOperation'} />
			</div>
		</div>
	)
}

export default HistoryTransaction