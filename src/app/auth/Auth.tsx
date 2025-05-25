'use client'

import { useAuthForm } from '@/src/app/auth/useAuthForm'
import Image from 'next/image'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/src/components/ui/Card'
import { Form } from '@/src/components/ui/form-elements/Form'
import { Button } from '@/src/components/ui/Button'
import AuthFields from '@/src/app/auth/AuthFields'
import { useUserContext } from '@/src/providers/user.context'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'

const Auth = () => {
	const {onSubmit, form, isPending} = useAuthForm()
	const pathname = usePathname()
	const { user, isLoadingUser } = useUserContext()
	const router = useRouter()

	useEffect(() => {
		if (!isLoadingUser && user) {
			user.role === 'USER' ? router.push(PUBLIC_URL['user-panel']()) : router.push(PUBLIC_URL.admin())
		}
	}, [isLoadingUser, user])

	return (
		<div className={'min-h-screen grid grid-cols-1 lg:grid-cols-2'}>
			<div className={'h-full hidden lg:flex items-center justify-center bg-linear-to-tl from-yellow-400 to-yellow-400 via-50% via-yellow-300'}>
				<Image className={'w-[300]'} src={'/images/Logo.svg'} alt={'Kiber-one Auth'} width={182} height={88}/>
			</div>
			<div className={'h-full flex flex-col items-center justify-center px-2 sm:px-0'}>
				<h1 className={'mb-5 text-5xl font-bold text-transparent bg-linear-to-r from-orange-300 via-30% via-yellow-400 to-orange-300 bg-clip-text'}>KIBER-SHOP</h1>
				<Card className={'border-none p-6 flex flex-col items-center justify-center w-full sm:w-[380px] shadow-[10px_10px_15px_rgba(0,0,0,0.3),-10px_10px_15px_rgba(0,0,0,0.4)]'}>
					<CardHeader className={'text-center pb-5 w-full'}>
						<CardTitle className={'pb-1 text-2xl sm:text-3xl font-bold'}>{'Войти в аккаунт'}</CardTitle>
						<CardDescription className={'text-xs sm:text-sm'}>{'Войдите в'} учётную запись, чтобы получить КиберТовары!</CardDescription>
					</CardHeader>
					<CardContent className={'p-0 w-full'}>
						<Form {...form}>
							<form className={'space-y-5'} onSubmit={form.handleSubmit(onSubmit)}>
								{/* Auth Fields */}

								<AuthFields form={form} isPending={isPending}/>

								<Button className={'w-full'} disabled={isPending}>{'Авторизоваться'}</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default Auth