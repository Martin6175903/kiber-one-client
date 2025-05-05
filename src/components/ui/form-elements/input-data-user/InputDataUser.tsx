'use client'
import React, { useEffect, useRef } from 'react'
import { Label } from '@/src/components/ui/form-elements/Label'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/src/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import toast from 'react-hot-toast'
import { PUBLIC_URL } from '@/src/config/url.config'
import { IUser } from '@/src/shared/types/user.types'
import { useRouter } from 'next/navigation'

interface InputDataUserProps {
	users: IUser[]
}

const InputDataUser = ({ users }: InputDataUserProps) => {
	const router = useRouter()
	const searchInputRef = useRef<HTMLInputElement>(null)

	// Input Data User
	useEffect(() => {
		// @ts-ignore
		document.querySelector('[aria-label="input-otp"]')?.focus()
	}, [])

	return (
		<div className={'flex flex-col gap-4 mt-3 mb-8'}>
			<Label htmlFor={'input-data-user'} className={'text-xl font-bold'}>
				Зачисление пользователю по номеру карты:
			</Label>
			<InputOTP
				pattern={REGEXP_ONLY_DIGITS}
				ref={searchInputRef}
				id={'input-data-user'}
				aria-label={'input-otp'}
				maxLength={10}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						const user = users?.find(
							user =>
								String(user?.numberCard) === searchInputRef?.current?.value
						)
						if (!user) {
							toast.error('Пользователя с таким номером карты нет!')
							return false
						}
						router.push(PUBLIC_URL.admin(`/users/history/${user.id}`))
					}
				}}
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
					<InputOTPSlot index={6} />
					<InputOTPSlot index={7} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={8} />
					<InputOTPSlot index={9} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	)
}

export default InputDataUser
