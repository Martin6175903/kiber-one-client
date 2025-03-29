import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/src/components/ui/Button'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/src/components/ui/DropdownMenu'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { cn } from '@/src/lib/utils'
import * as React from 'react'

export interface IProductsColumn {
  id: string
  title: string
  description: string
  price: string
  size?: string[]
}

export const productsColumn: ColumnDef<IProductsColumn>[] = [
  {
    accessorKey: 'title',
    header: ({column}) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Название <ArrowUpDown className={'ml-2 size-4'}/>
        </Button>
      )
    }
  },
  {
    accessorKey: 'description',
    header: ({column}) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Описание <ArrowUpDown className={'ml-2 size-4'}/>
        </Button>
      )
    },
    cell: ({row}) => (
      <div dangerouslySetInnerHTML={{ __html: row.original.description }}/>
    )
  },
  {
    accessorKey: 'price',
    header: ({column}) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Цена <ArrowUpDown className={'ml-2 size-4'}/>
        </Button>
      )
    }
  },
  {
    accessorKey: 'size',
    header: ({column}) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Размеры <ArrowUpDown className={'ml-2 size-4'}/>
        </Button>
      )
    }
  },
  {
    accessorKey: 'actions',
    header: 'Действия',
    cell: ({ row }) => (
     <DropdownMenu>
       <DropdownMenuTrigger asChild>
         <Button variant={'ghost'} className={'size-8 p-0'}>
           <MoreHorizontal className={'size-4'}/>
         </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align={'end'}>
         <DropdownMenuLabel>Действия</DropdownMenuLabel>
         <Link href={PUBLIC_URL.product(row.original.id)} target={'_blank'}>
           <DropdownMenuItem>
             <ExternalLink className={'size-4 mr-2'} />
             Страница с продуктом
           </DropdownMenuItem>
         </Link>
         <Link href={PUBLIC_URL.product(row.original.id)} target={'_blank'}>
           <DropdownMenuItem>
             <Pencil className={'size-4 mr-2'} />
             Изменить
           </DropdownMenuItem>
         </Link>
         <DropdownMenuSeparator />
       </DropdownMenuContent>
     </DropdownMenu>
    )
  }
]

export default productsColumn