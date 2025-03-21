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
		{isReg && (
			<>
				<FormField
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder={'Иван'} type={'text'} disabled={isPending} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					name={'firstName'}
					control={form.control}
					rules={{
						required: 'Имя обязательно',
						maxLength: {
							value: 15,
							message: 'Максимум 15 символов'
						},
						minLength: {
							value: 2,
							message: 'Минимум 2 символа'
						}
					}} />
				<FormField
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder={'Иванов'} type={'text'} disabled={isPending} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					name={'lastName'}
					control={form.control}
					rules={{
						required: 'Фамилия обязательна',
						maxLength: {
							value: 15,
							message: 'Максимум 15 символов'
						},
						minLength: {
							value: 2,
							message: 'Минимум 2 символа'
						}
					}} />
			</>
		)}
			<FormField
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder={'ivan@example.com'} type={'email'} disabled={isPending} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
				name={'email'}
				control={form.control}
				rules={{
					required: 'Почта обязательна',
					pattern: {
						value: validEmail,
						message: 'Введите валидную почту'
					}
				}} />
			<FormField
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder={'******'} type={'password'} disabled={isPending} {...field} />
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