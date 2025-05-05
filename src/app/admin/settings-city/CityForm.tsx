'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/src/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/src/components/ui/form-elements/Form'
import { Input } from '@/src/components/ui/form-elements/Input'
import { Textarea } from '@/src/components/ui/Textarea'
import { useCreateCity } from '@/src/hooks/queries/city/useCreateCity'
import { useUpdateCity } from '@/src/hooks/queries/city/useUpdateCity'
import { useGetCities } from '@/src/hooks/queries/city/useGetCities'

const CityForm = () => {
	const { cities } = useGetCities()
	const { createCity, isCreatedCity } = useCreateCity()
	const { updateCity, isUpdatedCity } = useUpdateCity()

	const title =
		cities && (cities.length ? 'Изменить данные' : 'Создать раздел "Город"')
	const action = cities && (cities.length ? 'Сохранить' : 'Создать')

	const form = useForm<ICity>({
		mode: 'onChange',
		values:
			cities && cities.length
				? {
						city: cities[0].city,
						phoneNumber: cities[0].phoneNumber,
						email: cities[0].email,
						whatsapp: cities[0].whatsapp,
						payment: cities[0].payment,
						linkLike: cities[0].linkLike,
						quantityMoneyLesson: cities[0].quantityMoneyLesson,
						quantityBonus: cities[0].quantityBonus
					}
				: {
						city: '',
						phoneNumber: '',
						email: '',
						whatsapp: '',
						payment: '',
						linkLike: '',
						quantityMoneyLesson: 0,
						quantityBonus: 0
					}
	})

	const onSubmit: SubmitHandler<ICity> = data => {
		data.quantityMoneyLesson = Number(data.quantityMoneyLesson)
		data.quantityBonus = Number(data.quantityBonus)

		if (cities && cities.length) updateCity({ ...data, id: cities[0].id })
		else createCity(data)
	}

	return (
		<div className={'container'}>
			<div className={'py-5'}>
				<div className={'flex flex-col gap-3 mb-5'}>
					<h1 className={'text-2xl font-bold'}>{title}</h1>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className={'flex flex-col gap-5'}
					>
						<FormField
							control={form.control}
							name={'city'}
							rules={{
								required: 'Город обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Город:</FormLabel>
									<FormControl>
										<Input
											placeholder={'Город...'}
											disabled={isUpdatedCity || isCreatedCity}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className={'flex gap-5'}>
							<div className={'w-full'}>
								<FormField
									control={form.control}
									name={'phoneNumber'}
									rules={{
										required: 'Номер телефона обязательно'
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Номер телефона:</FormLabel>
											<FormControl>
												<Input
													placeholder={'+375(__)___-__-__'}
													disabled={isUpdatedCity || isCreatedCity}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className={'w-full'}>
								<FormField
									control={form.control}
									name={'email'}
									rules={{
										required: 'Почта обязательна'
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Электронная почта:</FormLabel>
											<FormControl>
												<Input
													placeholder={'ivanov@gmail.com'}
													disabled={isUpdatedCity || isCreatedCity}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<FormField
							control={form.control}
							name={'whatsapp'}
							render={field => (
								<FormItem>
									<FormLabel>WhatsApp:</FormLabel>
									<FormControl>
										<Input
											placeholder={'Ссылка...'}
											disabled={isUpdatedCity || isCreatedCity}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'payment'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Оплата:</FormLabel>
									<FormControl>
										<Input
											placeholder={'Ссылка на оплату...'}
											disabled={isUpdatedCity || isCreatedCity}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'quantityMoneyLesson'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Киберонов за урок:</FormLabel>
									<FormControl>
										<Input
											placeholder={'Количество за урок...'}
											type={'number'}
											disabled={isUpdatedCity || isCreatedCity}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'quantityBonus'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Бонус за урок:</FormLabel>
									<FormControl>
										<Input
											placeholder={'Количество бонуса...'}
											type={'number'}
											disabled={isUpdatedCity || isCreatedCity}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className={'flex justify-center'}>
							<Button
								className={'max-w-1/2 w-full'}
								variant={'default'}
								disabled={isUpdatedCity || isCreatedCity}
							>
								{action} данные о разделе
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default CityForm
