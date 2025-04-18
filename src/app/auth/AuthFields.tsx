import { UseFormReturn } from 'react-hook-form'
import { IAuthForm } from '@/src/shared/types/auth.types'
import { FormControl, FormField, FormItem, FormMessage } from '@/src/components/ui/form-elements/Form'
import { Input } from '@/src/components/ui/form-elements/Input'
import { validEmail } from '@/src/shared/regex'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, undefined>
	isPending: boolean
	isReg?: boolean
}

const AuthFields = ({ form, isReg = false, isPending }: AuthFieldsProps) => {
	return (
		<>
		{/*{isReg && (*/}
		{/*	<>*/}
		{/*		<FormField*/}
		{/*			render={({ field }) => (*/}
		{/*				<FormItem>*/}
		{/*					<FormControl>*/}
		{/*						<Input placeholder={'Иван'} type={'text'} disabled={isPending} {...field} />*/}
		{/*					</FormControl>*/}
		{/*					<FormMessage />*/}
		{/*				</FormItem>*/}
		{/*			)}*/}
		{/*			name={'firstName'}*/}
		{/*			control={form.control}*/}
		{/*			rules={{*/}
		{/*				required: 'Имя обязательно',*/}
		{/*				pattern: /[А-Я][а-яА-Я]+/,*/}
		{/*				maxLength: {*/}
		{/*					value: 15,*/}
		{/*					message: 'Максимум 15 символов'*/}
		{/*				},*/}
		{/*				minLength: {*/}
		{/*					value: 2,*/}
		{/*					message: 'Минимум 2 символа'*/}
		{/*				}*/}
		{/*			}} />*/}
		{/*		<FormField*/}
		{/*			render={({ field }) => (*/}
		{/*				<FormItem>*/}
		{/*					<FormControl>*/}
		{/*						<Input placeholder={'Иванов'} type={'text'} disabled={isPending} {...field} />*/}
		{/*					</FormControl>*/}
		{/*					<FormMessage />*/}
		{/*				</FormItem>*/}
		{/*			)}*/}
		{/*			name={'lastName'}*/}
		{/*			control={form.control}*/}
		{/*			rules={{*/}
		{/*				required: 'Фамилия обязательна',*/}
		{/*				pattern: /[А-Я][а-яА-Я]+/,*/}
		{/*				maxLength: {*/}
		{/*					value: 15,*/}
		{/*					message: 'Максимум 15 символов'*/}
		{/*				},*/}
		{/*				minLength: {*/}
		{/*					value: 2,*/}
		{/*					message: 'Минимум 2 символа'*/}
		{/*				}*/}
		{/*			}} />*/}
		{/*	</>*/}
		{/*)}*/}
			<FormField
				name={'phoneNumber'}
				control={form.control}
				rules={{
					required: 'Номер телефона обязателен'
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder={'+375(__)___-__-__'} type={'tel'} disabled={isPending} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input autoComplete={'tel'} placeholder={'******'} type={'password'} disabled={isPending} {...field} />
						</FormControl>
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