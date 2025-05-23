import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/src/components/ui/form-elements/Form'
import { Input } from '@/src/components/ui/form-elements/Input'
import { Button } from '@/src/components/ui/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useChangePassword } from '@/src/hooks/queries/auth/useChangePassword'

const formSchema = z.object({
	password: z.string()
		.min(6, {
			message: 'Пароль должен иметь минимум 6 символов',
		})
		.max(50, {
			message: 'Пароль должен иметь максимум 50 символов'
		})
})

const UserPanelForm = () => {

	const [isHiddenPassword, setIsHiddenPassword] = useState(true)
	const {changePassword, isPendingChangePassword} = useChangePassword()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
		},
		mode: 'onChange'
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		changePassword(values.password)
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className={'flex relative'}>
							<FormLabel className={'text-xl text-nowrap'}>Изменение пароля:</FormLabel>
							<FormControl>
								<Input placeholder="Пароль..." {...field} type={isHiddenPassword ? 'password' : 'text'} autoComplete={'new-password'}/>
							</FormControl>
							<Button onClick={() => setIsHiddenPassword(!isHiddenPassword)} type={'button'} variant={'ghost'} className={'absolute right-0 hover:bg-transparent hover:scale-110 duration-300'}>
								{isHiddenPassword ? <EyeOff className={'size-5'}/> : <Eye className={'size-5'}/>}
							</Button>
							<FormMessage className={'absolute top-10'}/>
						</FormItem>
					)}
				/>
				<Button disabled={isPendingChangePassword} className={'w-80'} type="submit">Изменить пароль</Button>
			</form>
		</Form>
	)
}

export default UserPanelForm
