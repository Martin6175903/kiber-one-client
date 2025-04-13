import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/src/components/ui/Button'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/src/components/ui/DropdownMenu'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import * as React from 'react'

export interface IAdminUsersColumn {
  id: number
  fullName: string
  groupTitle: string
  balance: number
}

export const adminUsersColumns: ColumnDef<IAdminUsersColumn>[] = [
  {
    accessorKey: 'id',
    header: ({column}) => {
      return (
        <Button className={'w-full'} variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span className={'text-left w-full flex items-center'}>№ <ArrowUpDown className={'ml-2 size-4'}/></span>
        </Button>
      )
    },
    cell: ({row}) => (
      <span className={'ml-5 text-left inline-block w-full font-bold'}>{row.original.id}</span>
    )
  },
  {
    accessorKey: 'fullName',
    header: ({column}) => {
      return (
        <Button className={'w-full text-left flex justify-start'} variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Фамилия и имя <ArrowUpDown className={'ml-2 size-4'}/>
        </Button>
      )
    },
    cell: ({row}) => (
      <span className={'ml-2 text-left inline-block w-full font-bold'}>{row.original.fullName}</span>
    )
  },
  {
    accessorKey: 'groupTitle',
    header: ({column}) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Название группы <ArrowUpDown className={'ml-2 size-4'}/>
        </Button>
      )
    }
  },
  {
    accessorKey: 'balance',
    header: ({column}) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Баланс <ArrowUpDown className={'ml-2 size-4'}/>
        </Button>
      )
    },
    cell: ({row}) => (
      <span className={'text-center'}>{row.original.balance} K</span>
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
    cell: ({ row }) => (
      <div className={'text-center'}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className={'size-8 p-0'}>
              <MoreHorizontal className={'size-4'}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={'end'}>
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <Link href={PUBLIC_URL.product(String(row.original.id))}>
              <DropdownMenuItem>
                <Pencil className={'size-4 mr-2'} />
                Редактировать
              </DropdownMenuItem>
            </Link>
            <Link href={PUBLIC_URL.products(String(row.original.id))}>
              <DropdownMenuItem>
                <Trash className={'size-4 mr-2'}/>
                Удалить
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
]

export default adminUsersColumns