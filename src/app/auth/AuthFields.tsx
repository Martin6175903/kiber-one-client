'use client'
import { UseFormReturn } from 'react-hook-form'
import { IAuthForm } from '@/src/shared/types/auth.types'
import { FormControl, FormField, FormItem, FormMessage } from '@/src/components/ui/form-elements/Form'
import { Input } from '@/src/components/ui/form-elements/Input'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/src/components/ui/Button'
import { useState } from 'react'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, undefined>
	isPending: boolean
	isReg?: boolean
}

const AuthFields = ({ form, isPending }: AuthFieldsProps) => {
	const [isHiddenPassword, setIsHiddenPassword] = useState(true)
	return (
		<>
			<FormField
				name={'numberCard'}
				control={form.control}
				rules={{
					required: 'Номер карты обязателен',
					minLength: {
						message: 'Не меньше 9 символов',
						value: 9
					},
					maxLength: {
						message: 'Не более 10 символов',
						value: 10
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder={'Номер карты...'} type={'number'} disabled={isPending} autoComplete={'username'} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				render={({ field }) => (
					<FormItem className={'relative'}>
						<FormControl>
							<Input autoComplete={'current-password'} placeholder={'******'} type={isHiddenPassword ? 'password' : 'text'} disabled={isPending} {...field} />
						</FormControl>
						<Button onClick={() => setIsHiddenPassword(!isHiddenPassword)} type={'button'} variant={'ghost'}
										className={'absolute right-0 hover:bg-transparent hover:scale-110 duration-300'}>
							{isHiddenPassword ? <EyeOff className={'size-5'} /> : <Eye className={'size-5'} />}
						</Button>
						<FormMessage />
					</FormItem>
				)}
				name={'password'}
				control={form.control}
				rules={{
					required: 'Пароль обязателен',
					maxLength: {
						value: 50,
						message: 'Максимум 50 символов'
					},
					minLength: {
						value: 6,
						message: 'Минимум 6 символов'
					}
				}} />
		</>
	)
}

export default AuthFields