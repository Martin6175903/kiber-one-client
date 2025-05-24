'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/src/components/ui/Button'
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
import { IUser, IUserInput } from '@/src/shared/types/user.types'
import { useCreateUser } from '@/src/hooks/queries/user/useCreateUser'
import { useUpdateUser } from '@/src/hooks/queries/user/useUpdateUser'
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/ToggleGroup'
import { Eye, EyeOff, Shield, User } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/src/components/ui/Select'
import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'
import { useState } from 'react'

interface UserFormProps {
	user: IUser | null
}

const UserForm = ({ user }: UserFormProps) => {

	const [isHiddenPassword, setIsHiddenPassword] = useState(true)
	const { createUser, isPendingUser } = useCreateUser()
	const { updateUser, isUpdateUser } = useUpdateUser(user?.id!)

	const { groups } = useGetGroups()

	const title = user ? 'Изменение данных пользователя' : 'Создание пользователя'
	const description = user
		? 'Изменить данные пользователя'
		: 'Создать нового пользователя'
	const action = user ? 'Сохранить' : 'Создать'

	const form = useForm<IUserInput>({
		mode: 'onChange',
		values: user ? ({
			name: user.name,
			role: user.role === 'MODERATOR' ? 'MODERATOR' : 'USER',
			numberCard: `${user.numberCard}`,
			password: '',
			quantityMoney: user.quantityMoney,
			image: undefined,
			phoneNumber: user.phoneNumber,
			groupId: user.groupId,
		}) : {
			name: '',
			role: 'USER',
			numberCard: '',
			password: '',
			quantityMoney: undefined,
			image: undefined,
			phoneNumber: '',
			groupId: undefined,
		},
	})

	const role = form.watch('role')

	const onSubmit: SubmitHandler<IUserInput> = data => {

		data.role = data.role === 'MODERATOR' ? 'MODERATOR' : 'USER'
		data.quantityMoney = Number(data.quantityMoney)
		console.log(data)
		if (user) updateUser(data)
		else createUser(data)
	}

	// @ts-ignore
	return (
		<div className={'container'}>
			<div className={'py-5'}>
				<div className={'flex flex-col gap-3'}>
					<h1 className={'text-2xl font-bold'}>{title}</h1>
					<p className={'text-xl text-gray-600 mb-3'}>{description}</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-5 w-1/2'}>
						<FormField
							render={({ field }) => (
								<FormItem>
									<FormLabel>Номер карточки ученика:</FormLabel>
									<FormControl>
										<Input placeholder={'Номер карточки...'} type={'number'}
													 disabled={isUpdateUser || isPendingUser} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							name={'numberCard'}
							control={form.control}
							rules={{
								required: 'Номер карточки обязателен для ввода',
								maxLength: {
									value: 12,
									message: 'Максимум 12 цифр',
								},
								minLength: {
									value: 8,
									message: 'Минимум 8 цифр',
								},
							}}
						/>
						<FormField
							render={({ field }) => (
								<FormItem className={'relative'}>
									<FormLabel>Пароль:</FormLabel>
									<FormControl>
										<Input autoComplete={'tel'} placeholder={'******'} type={isHiddenPassword ? 'password' : 'text'}
													 disabled={isUpdateUser || isPendingUser} {...field} />
									</FormControl>
									<Button onClick={() => setIsHiddenPassword(!isHiddenPassword)} type={'button'} variant={'ghost'}
													className={'absolute right-0 top-5 hover:bg-transparent hover:scale-110 duration-300'}>
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
									message: 'Максимум 50 символов',
								},
								minLength: {
									value: 6,
									message: 'Минимум 6 символов',
								},
							}}
						/>
						<FormField
							render={({ field }) => (
								<FormItem>
									<FormLabel>ФИО:</FormLabel>
									<FormControl>
										<Input placeholder={'Иван Иванов'} type={'text'}
													 disabled={isPendingUser || isUpdateUser} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							name={'name'}
							control={form.control}
							rules={{
								required: 'ФИО обязательно',
								maxLength: {
									value: 32,
									message: 'Максимум 32 символа',
								},
								minLength: {
									value: 2,
									message: 'Минимум 2 символа',
								},
							}}
						/>
						<FormField
							name={'phoneNumber'}
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Номер телефона:</FormLabel>
									<FormControl>
										<Input placeholder={'+375(__)___-__-__'} type={'tel'} disabled={isPendingUser || isUpdateUser} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Тип пользователя:</FormLabel>
									<FormControl>
										<ToggleGroup
											type="single"
											value={String(field.value)}
											onValueChange={(value) => {
												if (value) {
													field.onChange(value)
												}
											}}
											className="grid grid-cols-2"
										>
											<ToggleGroupItem
												value={'USER'}
												className="data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
											>
												<User className="mr-2 h-4 w-4" />
												Ученик
											</ToggleGroupItem>
											<ToggleGroupItem
												value={'MODERATOR'}
												className="data-[state=on]:bg-darkyellow/80 data-[state=on]:text-white cursor-pointer"
											>
												<Shield className="mr-2 h-4 w-4" />
												Преподаватель
											</ToggleGroupItem>
										</ToggleGroup>
									</FormControl>
									<FormDescription>
										Выберите тип создаваемого пользователя
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{String(role) === 'USER' && (
							<>
								<FormField
									render={({ field }) => (
										<FormItem>
											<FormLabel>Начальное количество киберонов:</FormLabel>
											<FormControl>
												<Input placeholder={'Начальное количество киберонов...'} step={5} defaultValue={'0'}
															 type={'number'} disabled={isPendingUser || isUpdateUser} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
									name={'quantityMoney'}
									control={form.control}
									rules={{
										required: 'Начальная сумма обязательна',
										min: {
											value: 0,
											message: 'Число не может быть меньше 0.',
										},
									}}
								/>
								<FormField
									control={form.control}
									name="groupId"
									rules={{
										required: 'Выбор группы обязателен',
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Выбор группы:</FormLabel>
											<FormControl>
												<Select disabled={isPendingUser || isUpdateUser} value={field.value}
																onValueChange={field.onChange}>
													<SelectTrigger className="w-[250px]">
														<SelectValue placeholder="Выберите группу..." />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectLabel>Категория</SelectLabel>
															{groups ? groups.map(group => (
																<SelectItem key={group.id} value={group.id as string}>{group.title}</SelectItem>
															)) : <></>}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
						<div className={'flex justify-center'}>
							<Button className={'max-w-1/2 w-full'} variant={'default'} disabled={isPendingUser || isUpdateUser}>{action} пользователя</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default UserForm