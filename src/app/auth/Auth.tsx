'use client'

import { useState } from 'react'
import { useAuthForm } from '@/src/app/auth/useAuthForm'
import Image from 'next/image'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/src/components/ui/form-elements/Card'
import { Form } from '@/src/components/ui/form-elements/Form'
import { Button } from '@/src/components/ui/Button'
import AuthFields from '@/src/app/auth/AuthFields'

const Auth = () => {
	const [isReg, setIsReg] = useState(false)

	const {onSubmit, form, isPending} = useAuthForm(isReg)

	return (
		<div className={'min-h-screen grid grid-cols-1 lg:grid-cols-2'}>
			<div className={'h-full bg-blue-600 hidden lg:flex items-center justify-center'}>
				<Image src={'/images/Logo.svg'} alt={'Kiber-one Auth'} width={182} height={88}/>
			</div>
			<div className={'h-full flex flex-col items-center justify-center'}>
				<Card className={'border-none p-6 flex flex-col items-center justify-center w-[380px]'}>
					<CardHeader className={'text-center pb-5 w-full'}>
						<CardTitle className={'pb-1 text-3xl font-bold'}>{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}</CardTitle>
						<CardDescription>Войдите или создайте учётную запись, чтобы оформлять КиберТовары!</CardDescription>
					</CardHeader>
					<CardContent className={'p-0 w-full'}>
						<Form {...form}>
							<form className={'space-y-5'} onSubmit={form.handleSubmit(onSubmit)}>
								{/* Auth Fields */}

								<AuthFields form={form} isPending={isPending} isReg={isReg}/>

								<Button className={'w-full'} disabled={isPending}>{isReg ? 'Создать' : 'Авторизоваться'}</Button>
							</form>
						</Form>
					</CardContent>
					<CardFooter className={'p-0 mt-4 text-sm text-muted-foreground'}>
						{isReg ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта'}
						<button className={'ml-1 text-sky-500'} onClick={() => setIsReg(!isReg)}>
							{isReg ? 'Войти' : 'Создать'}
						</button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}

export default Auth