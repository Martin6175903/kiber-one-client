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
import { CalendarIcon, Shield, User } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/Popover'
import { cn } from '@/src/lib/utils'
import { Calendar } from '@/src/components/ui/Calendar'
import { format } from "date-fns"
import { useEffect, useState } from 'react'

interface UserFormProps {
  user: IUser | null
}

const UserForm = ({ user }: UserFormProps) => {

  const { createUser, isPendingUser } = useCreateUser()
  const { updateUser, isUpdateUser } = useUpdateUser(user?.id!)

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
      yearOfBirth: new Date(user.yearOfBirth),
      startLearning: user.startLearning,
    }) : {
      firstName: '',
      lastName: '',
      role: EnumUserRole.USER,
      phoneNumber: '',
      password: '',
      quantityMoney: undefined,
      yearOfBirth: undefined,
      startLearning: undefined,
    },
  })

	const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
	const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

	// Инициализация значений при загрузке
	useEffect(() => {
		if (form.getValues('yearOfBirth')) {
			const birthDate = form.getValues('yearOfBirth')
			if(birthDate) {
				setSelectedYear(birthDate.getFullYear())
				setCurrentMonth(birthDate)
			}
		}
	}, [form])

	// Генерируем список годов (например, ±20 лет от текущего)
	const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - 24 + i);

  const role = form.watch("role")

  const onSubmit: SubmitHandler<IUserInput> = data => {

		data.role = data.role === '1' ? 'MODERATOR' : 'USER'
		data.quantityMoney = Number(data.quantityMoney)

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
              }} />
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
										min: {
											value: 0,
											message: 'Число не может быть меньше 0.'
										}
									}}
								/>
								<FormField
									control={form.control}
									name="yearOfBirth"
									render={({ field }) => {
										const selectedDate = field.value
										const displayDate = selectedDate ? format(selectedDate, "PPP") : "Выберите дату рождения..."

										return (
											<FormItem className="flex flex-col">
												<FormLabel>Дата рождения:</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={"outline"}
																className={cn(
																	"w-[300px] pl-3 text-left font-normal cursor-pointer",
																	!field.value && "text-muted-foreground"
																)}
															>
																{displayDate}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<div className={'flex gap-3'}>
															<Calendar
																mode="single"
																selected={selectedDate}
																onSelect={(date) => {
																	field.onChange(date)
																	if (date) {
																		setSelectedYear(date.getFullYear())
																		setCurrentMonth(date)
																	}
																}}
																disabled={(date) =>
																	date > new Date() || date < new Date("1999-01-01")
																}
																month={currentMonth}
																onMonthChange={setCurrentMonth}
																defaultMonth={currentMonth}
																initialFocus
															/>
															<div className="p-2 border-r overflow-y-auto max-h-[300px]">
																{years.map((y) => (
																	<div
																		key={y}
																		className={`p-2 text-center cursor-pointer rounded hover:bg-gray-100 ${
																			y === selectedYear ? "bg-blue-100 font-bold" : ""
																		}`}
																		onClick={() => {
																			const newDate = new Date(selectedDate || new Date())
																			newDate.setFullYear(y)
																			field.onChange(newDate)
																			setSelectedYear(y)
																			setCurrentMonth(new Date(y, newDate.getMonth()))
																		}}
																	>
																		{y}
																	</div>
																))}
															</div>
														</div>
													</PopoverContent>
												</Popover>
												<FormDescription>
													Дата рождения используется для расчета возраста
												</FormDescription>
												<FormMessage />
											</FormItem>
										)
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