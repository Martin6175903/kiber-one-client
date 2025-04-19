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
import { EnumUserRole, IUser, IUserInput } from '@/src/shared/types/user.types'
import { useCreateUser } from '@/src/hooks/queries/user/useCreateUser'
import { useUpdateUser } from '@/src/hooks/queries/user/useUpdateUser'
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/ToggleGroup'
import { Shield, User } from 'lucide-react'
import InputDate from '@/src/components/ui/form-elements/InputDate'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/src/components/ui/Select'
import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'

interface UserFormProps {
  user: IUser | null
}

const UserForm = ({ user }: UserFormProps) => {

  const { createUser, isPendingUser } = useCreateUser()
  const { updateUser, isUpdateUser } = useUpdateUser(user?.id!)

	const {groups} = useGetGroups()

  const title = user ? 'Изменение данных пользователя' : 'Создание пользователя'
  const description = user
    ? 'Изменить данные пользователя'
    : 'Создать нового пользователя'
  const action = user ? 'Сохранить' : 'Создать'

  const form = useForm<IUserInput>({
    mode: 'onChange',
    values: user ? ({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role === 1 ? EnumUserRole.MODERATOR : EnumUserRole.USER,
      phoneNumber: user.phoneNumber,
      password: '',
      quantityMoney: user.quantityMoney,
      yearOfBirth: user.yearOfBirth,
      startLearning: user.startLearning,
			numberCard: user.numberCard,
			groupId: user.groupId
    }) : {
      firstName: '',
      lastName: '',
      role: EnumUserRole.USER,
      phoneNumber: '',
      password: '',
      quantityMoney: undefined,
      yearOfBirth: undefined,
      startLearning: undefined,
			numberCard: null,
			groupId: undefined
    }
  })

  const role = form.watch("role")

  const onSubmit: SubmitHandler<IUserInput> = data => {

		data.role = data.role === '1' ? 'MODERATOR' : 'USER'
		data.quantityMoney = Number(data.quantityMoney)
		data.numberCard = Number(data.numberCard)

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
          <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-5'}>
            <FormField
              name={'phoneNumber'}
              control={form.control}
              rules={{
                required: 'Номер телефона обязателен',
              }}
              render={({ field }) => (
                <FormItem>
									<FormLabel>Номер телефона:</FormLabel>
                  <FormControl>
                    <Input placeholder={'+375(__)___-__-__'} type={'tel'}
                           disabled={isPendingUser || isUpdateUser} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
									<FormLabel>Пароль:</FormLabel>
                  <FormControl>
                    <Input autoComplete={'tel'} placeholder={'******'} type={'password'}
                           disabled={isUpdateUser || isPendingUser} {...field} />
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
									<FormLabel>Имя:</FormLabel>
                  <FormControl>
                    <Input placeholder={'Иван'} type={'text'} disabled={isPendingUser || isUpdateUser} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'firstName'}
              control={form.control}
              rules={{
                required: 'Имя обязательно',
                pattern: /[А-Я][а-яА-Я]+/,
                maxLength: {
                  value: 15,
                  message: 'Максимум 15 символов',
                },
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа',
                },
              }}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
									<FormLabel>Фамилия:</FormLabel>
                  <FormControl>
                    <Input placeholder={'Иванов'} type={'text'} disabled={isPendingUser || isUpdateUser} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'lastName'}
              control={form.control}
              rules={{
                required: 'Фамилия обязательна',
                pattern: /[А-Я][а-яА-Я]+/,
                maxLength: {
                  value: 15,
                  message: 'Максимум 15 символов',
                },
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа',
                },
              }}
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
                        value={String(EnumUserRole.USER)}
                        className="data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Ученик
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value={String(EnumUserRole.MODERATOR)}
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
            {String(role) === "0" && (
              <>
								<FormField
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder={'Начальное количество киберонов...'} step={5} defaultValue={'0'} type={'number'} disabled={isPendingUser || isUpdateUser} {...field} />
											</FormControl>
											<FormMessage/>
										</FormItem>
									)}
									name={'quantityMoney'}
									control={form.control}
									rules={{
										required: 'Начальная сумма обязательна',
										min: {
											value: 0,
											message: 'Число не может быть меньше 0.'
										}
									}}
								/>
								<FormField
									control={form.control}
									name="yearOfBirth"
									rules={{
										required: "Дата рождения обязательно"
									}}
									render={({ field }) => <InputDate field={field} label={'Дата рождения:'} placeholder={'Выберите дату рождения...'}/>}
								/>
								<FormField
									control={form.control}
									name="startLearning"
									rules={{
										required: "Начало обучения ученика обязательно"
									}}
									render={({ field }) => <InputDate field={field} label={'Дата начала обучения:'} placeholder={'Начало обучения с...'}/>}
								/>
								<FormField
									control={form.control}
									name="groupId"
									rules={{
										required: "Выбор группы обязателен"
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Выбор группы:</FormLabel>
											<FormControl>
												<Select disabled={isPendingUser || isUpdateUser} value={field.value} onValueChange={field.onChange}>
													<SelectTrigger className="w-[250px]">
														<SelectValue placeholder="Выберите группу..." />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectLabel>Категория</SelectLabel>
															{groups ? groups.map(group => (
																<SelectItem key={group.id} value={group.id}>{group.title}</SelectItem>
															)) : <></>}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage/>
										</FormItem>
									)}
								/>
								<FormField
									render={({ field }) => (
										<FormItem>
											<FormLabel>Номер карточки ученика:</FormLabel>
											<FormControl>
												<Input placeholder={'Номер карточки...'} type={'number'} disabled={isUpdateUser || isPendingUser} {...field} />
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