import { UseFormReturn } from 'react-hook-form'
import { IAuthForm } from '@/src/shared/types/auth.types'
import { FormControl, FormField, FormItem, FormMessage } from '@/src/components/ui/form-elements/Form'
import { Input } from '@/src/components/ui/form-elements/Input'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, undefined>
	isPending: boolean
	isReg?: boolean
}

const AuthFields = ({ form, isPending }: AuthFieldsProps) => {
	return (
		<>
			<FormField
				name={'phoneNumber'}
				control={form.control}
				rules={{
					required: 'Номер телефона обязателен'
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder={'+375(__)___-__-__'} type={'tel'} disabled={isPending} autoComplete={'tel'} {...field} />
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