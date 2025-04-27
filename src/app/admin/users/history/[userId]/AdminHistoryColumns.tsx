import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/src/components/ui/Button'
import { ArrowUpDown, Trash } from 'lucide-react'
import { useDeleteUser } from '@/src/hooks/queries/user/useDeleteUser'
import * as React from 'react'
import { formatDate } from '@/src/utils/date/format-date'
import { useDeleteTransaction } from '@/src/hooks/queries/transaction/useDeleteTransaction'
import { EnumTypeTransaction } from '@/src/shared/types/transaction.types'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'

export interface IAdminHistoryColumn {
	id?: string
	dateOperation: Date
	description: string
	type: "BONUS" | "PURCHASE"
	quantityMoney: number
	balance: number
}

export const adminHistoryColumns: ColumnDef<IAdminHistoryColumn>[] = [
	{
		accessorKey: 'dateOperation',
		header: ({column}) => {
			return (
				<Button className={'w-full cursor-pointer'} variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					<span className={'text-left w-full flex items-center'}>Дата операции <ArrowUpDown className={'ml-2 size-4'}/></span>
				</Button>
			)
		},
		cell: ({row}) => (
			<span className={'ml-5 text-left inline-block w-full font-medium'}>{format(new Date(row.getValue("dateOperation")), 'dd.MM.yyyy')}</span>
		)
	},
	{
		accessorKey: 'description',
		header: ({column}) => {
			return (
				<Button className={'w-full text-left flex justify-start cursor-pointer'} variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Причина <ArrowUpDown className={'ml-2 size-4'}/>
				</Button>
			)
		},
		cell: ({row}) => (
			<span className={'ml-2 text-left inline-block w-full font-medium'}>{row.original.description}</span>
		)
	},
	{
		accessorKey: 'type',
		header: ({column}) => {
			return (
				<Button variant={'ghost'} className={'cursor-pointer'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Тип операции <ArrowUpDown className={'ml-2 size-4'}/>
				</Button>
			)
		},
		cell: ({row}) => (
			<span className={'font-medium'}>{row.original.type === 'BONUS' ? 'Начисление' : 'Списывание'}</span>
		)
	},
	{
		accessorKey: 'quantityMoney',
		header: ({column}) => {
			return (
				<Button variant={'ghost'} className={'cursor-pointer'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Количество <ArrowUpDown className={'ml-2 size-4'}/>
				</Button>
			)
		},
		cell: ({row}) => (
			<span className={'text-center font-medium'}>{row.original.quantityMoney} K</span>
		)
	},
	{
		accessorKey: 'balance',
		header: ({column}) => {
			return (
				<Button variant={'ghost'} className={'cursor-pointer'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Баланс <ArrowUpDown className={'ml-2 size-4'}/>
				</Button>
			)
		},
		cell: ({row}) => (
			<span className={'text-center font-medium'}>{row.original.balance} K</span>
		)
	},
	{
		accessorKey: 'actions',
		header: () => {
			return (
				<Button variant={'ghost'}>
					Действия
				</Button>
			)
		},
		cell: ({ row }) => {
			const params = useParams<{ userId: string }>()
			const { deleteTransaction, isLoadingDeleteTransaction } = useDeleteTransaction()
			const {type, quantityMoney, id} = row.original
			return (
				<Button disabled={isLoadingDeleteTransaction} onClick={() => {
					if (id) deleteTransaction({id, userId: params.userId, type, quantityMoney})
				}} variant={'ghost'} className={'p-0 flex gap-1 items-center cursor-pointer'}>
					<Trash className={'size-4 mr-2'}/>
					Удалить
				</Button>
			)
		}
	}
]

export default adminHistoryColumns