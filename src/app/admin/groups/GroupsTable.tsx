'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/src/components/ui/Table'
import { Button } from '@/src/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/src/components/ui/DropdownMenu'
import { MoreHorizontal, Pencil, Trash2, Users } from 'lucide-react'
import { IGroup } from '@/src/shared/types/group.types'
import { useDeleteGroup } from '@/src/hooks/queries/group/useDeleteGroup'
import { switchAgeCategory } from '@/src/utils/group/switchAgeCategory'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'
import { dayLesson } from '@/src/utils/group/dayLesson'
import Link from 'next/link'

export function GroupsTable({ groups }: { groups: IGroup[] | undefined }) {
	const { deleteGroup, isLoadingDeleteGroup } = useDeleteGroup()
	const router = useRouter()

	return (
		<div className='rounded-lg border shadow-sm'>
			<Table className={'overflow-hidden'}>
				<TableHeader className='bg-gray-50/50'>
					<TableRow
						className={'grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_0.6fr]'}
					>
						<TableHead className={'flex items-center ml-1.5 w-full'}>
							<span>Название группы</span>
						</TableHead>
						<TableHead
							className={'flex items-center ml-0.5 w-full justify-center'}
						>
							<span>Возраст</span>
						</TableHead>
						<TableHead
							className={'flex items-center ml-0.5 w-full justify-center'}
						>
							<span>Год</span>
						</TableHead>
						<TableHead
							className={'flex items-center ml-0.5 w-full justify-center'}
						>
							<span>День</span>
						</TableHead>
						<TableHead
							className={'flex items-center ml-0.5 w-full justify-center'}
						>
							<span>Время</span>
						</TableHead>
						<TableHead
							className={'flex items-center ml-0.5 w-full justify-center'}
						>
							<span>Ассистент</span>
						</TableHead>
						<TableHead
							className={'flex items-center ml-0.5 w-full justify-center'}
						>
							<span>Действия</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{groups &&
						groups.map(group => (
							<TableRow
								key={group.id}
								className='hover:bg-gray-50/50 grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_0.6fr]'
							>
								<TableCell className='font-medium'>
									<div className='flex flex-col'>
										<span className='font-medium'>{group.title}</span>
										<div className='flex items-center gap-2 mt-3 text-sm text-muted-foreground hover:text-black duration-300 hover:scale-105'>
											<Users className='h-4 w-4' />
											<Link href={PUBLIC_URL.admin(`/users/group/${group.id}`)}>
												Состав ({group.membersCount})
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell className='text-sm flex justify-center items-center'>
									{switchAgeCategory(group.ageCategory)}
								</TableCell>
								<TableCell className='text-sm flex justify-center items-center'>
									{group.yearOfGroup}
								</TableCell>
								<TableCell className='text-sm flex justify-center items-center'>
									{dayLesson(group.dayOfStudy)}
								</TableCell>
								<TableCell className='text-sm flex justify-center items-center'>
									{group.startTimeLearning} - {group.endTimeLearning}
								</TableCell>
								<TableCell className='text-sm flex justify-center items-center'>
									<span className='text-muted-foreground text-center'>
										{group.assistant ? group.assistant : '—'}
									</span>
								</TableCell>
								<TableCell className={'flex justify-center items-center'}>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='ghost' size='icon' className='h-8 w-8'>
												<MoreHorizontal className='h-4 w-4' />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end' className='w-40'>
											<DropdownMenuItem
												className='cursor-pointer'
												onSelect={() =>
													router.push(PUBLIC_URL.admin(`/groups/${group.id}`))
												}
											>
												<Pencil className='mr-2 h-4 w-4' />
												Редактировать
											</DropdownMenuItem>
											<DropdownMenuItem
												onSelect={() => {
													deleteGroup(group.id!)
												}}
												disabled={isLoadingDeleteGroup}
												className='cursor-pointer text-red-600'
											>
												<Trash2 className='mr-2 h-4 w-4' />
												Удалить
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			{!groups?.length && (
				<div className={'py-3 pl-3 font-bold text-xl'}>Ничего не найдено.</div>
			)}
		</div>
	)
}
