'use client'
import { useGetUsers } from '@/src/hooks/queries/user/useGetUsers'
import AdminUsersColumns, {
	IAdminUsersColumn
} from '@/src/app/admin/users/AdminUsersColumns'
import { AdminDataTable } from '@/src/components/ui/data-loading/admin/AdminDataTable'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'
import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'
import { Label } from '@/src/components/ui/form-elements/Label'
import { Input } from '@/src/components/ui/form-elements/Input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/src/components/ui/input-otp'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import InputDataUser from '@/src/components/ui/form-elements/input-data-user/InputDataUser'

const Users = () => {
	const { users, isLoadingUsers } = useGetUsers()
	const router = useRouter()
	const { groups, isLoading } = useGetGroups()

	const formattedUsers: IAdminUsersColumn[] = users
		? (users
				.filter(user => user.role === 'USER')
				.map((user, index) => ({
					id: { generateId: index + 1, id: user.id },
					fullName: user.name,
					groupTitle:
						groups &&
						groups.filter(group => user.groupId === group.id)[0]?.title,
					balance: user.quantityMoney
				})) as IAdminUsersColumn[])
		: []

	return (
		<div>
			<h2 className='title'>Пользователи</h2>
			<Button
				tabIndex={2}
				onClick={() => router.push(PUBLIC_URL.admin('/users/create'))}
				className={'my-5'}
			>
				Создать пользователя
			</Button>
			<InputDataUser users={users ? users : []} />
			<AdminDataTable
				columns={AdminUsersColumns}
				data={isLoadingUsers ? [] : formattedUsers}
				filterKey={'fullName'}
				className={
					'grid grid-cols-[0.5fr_1.5fr_2fr_1fr_0.7fr] justify-center items-center'
				}
			/>
		</div>
	)
}

export default Users
