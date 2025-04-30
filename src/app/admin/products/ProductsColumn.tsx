import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/src/components/ui/Button'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/src/components/ui/DropdownMenu'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import * as React from 'react'
import { useDeleteProduct } from '@/src/hooks/queries/products/useDeleteProduct'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/components/ui/AlertDialog'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'

export interface IProductsColumn {
  id?: string
  title: string
  description: string
  price: string | number
  isStock: boolean
  size?: string[]
}

export const productsColumn: ColumnDef<IProductsColumn>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Название <ArrowUpDown className={'ml-2 size-4'} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Описание <ArrowUpDown className={'ml-2 size-4'} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <blockquote>{row.original.description}</blockquote>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Цена <ArrowUpDown className={'ml-2 size-4'} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span>{row.original.price} K</span>
    ),
  },
  {
    accessorKey: 'isStock',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          В наличии <ArrowUpDown className={'ml-2 size-4'} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span>{row.original.isStock ? 'Да' : 'Нет'}</span>
    ),
  },
  {
    accessorKey: 'size',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Размеры <ArrowUpDown className={'ml-2 size-4'} />
        </Button>
      )
    },
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
      const {deleteProduct, isLoadingDelete} = useDeleteProduct()
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className={'size-8 p-0'}>
              <MoreHorizontal className={'size-4'} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={'end'}>
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <Link href={PUBLIC_URL.product(row.original.id)}>
              <DropdownMenuItem>
                <ExternalLink className={'size-4 mr-2'} />
                Страница с продуктом
              </DropdownMenuItem>
            </Link>
            <Link href={PUBLIC_URL.admin(`/products/${row.original.id}`)}>
              <DropdownMenuItem>
                <Pencil className={'size-4 mr-2'} />
                Изменить
              </DropdownMenuItem>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger disabled={isLoadingDelete} className={'flex gap-2 hover:bg-accent w-full focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*=\'text-\'])]:text-muted-foreground relative cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4'}>
                <Trash className={'size-4 mr-2 text-red-500'} />
                Удалить
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                  <AlertDialogDescription>Это действие нельзя будет отменить.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className={'cursor-pointer'}>Отмена</AlertDialogCancel>
                  <AlertDialogAction className={'cursor-pointer'} onClick={() => deleteProduct(row.original.id!)}>Удалить</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default productsColumn