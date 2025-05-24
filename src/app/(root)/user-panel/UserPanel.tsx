'use client'
import { useUserContext } from '@/src/providers/user.context'
import { useGetGroup } from '@/src/hooks/queries/group/useGetGroup'
import Image from 'next/image'
import UserPanelForm from '@/src/app/(root)/user-panel/UserPanelForm'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/Dialog'
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/ui/components/dialog'
import { useState } from 'react'
import { useUpdateImage } from '@/src/hooks/queries/user/useUpdateImage'

const UserPanel = () => {
	const { user } = useUserContext()
	const {group} = useGetGroup(user?.groupId!)

	const [image, setImage] = useState(user?.image)

	const { updateImage, isPendingUpdateImage } = useUpdateImage()

	return (
		<div className={'h-full mt-8 text-black flex items-center'}>
			<div className={'container'}>
				<div className={'flex flex-col gap-7'}>
					<div className={'flex justify-between items-center'}>
						<h1 className={'text-4xl font-bold'}>Личный кабинет</h1>
						<Link className={'duration-300 hover:scale-105'} href={PUBLIC_URL['user-panel']('/history-transaction')}>
							<Button>История операций</Button>
						</Link>
					</div>
					{user && (
						<div>
							<div className={'py-7 px-2 border-2 border-solid border-darkyellow/25 rounded-md shadow-[2px_2px_10px_rgba(0,0,0,0.3),-2px_-2px_10px_rgba(0,0,0,0.3)]'}>
								<div className={'text-xl flex justify-center items-center gap-30'}>
									<div className={'flex-3/10 flex flex-col items-center gap-5'}>
										<Image className={'rounded-full'} src={user.image ? user.image : '/images/user-icon.svg'} alt={'User Icon'} width={200} height={200}/>
										<Dialog>
											<DialogTrigger asChild>
												<Button variant="outline">Изменить аватарку</Button>
											</DialogTrigger>
											<DialogContent className="min-w-[800px]">
												<DialogHeader>
													<DialogTitle>Изменение аватарки</DialogTitle>
													<DialogDescription>
														Выберите изображение и сохраните изменения.
													</DialogDescription>
												</DialogHeader>
												<DialogBody className={'grid grid-cols-5 gap-5'}>
													{new Array(29).fill(0).map((_, index) => (
														<div key={index}>
															<button onClick={() => setImage(`/images/users-avatar/avatar-${index+1}.png`)} className={`inline-block rounded-full cursor-pointer border-4 border-solid ${image === `/images/users-avatar/avatar-${index+1}.png` ? 'border-darkyellow' : 'border-transparent'}`}>
																<Image className={'rounded-full'} src={`/images/users-avatar/avatar-${index+1}.png`} alt={'Avatar Icon'} width={90} height={90}/>
															</button>
														</div>
													))}
												</DialogBody>
												<DialogFooter>
													<Button disabled={isPendingUpdateImage} onClick={() => updateImage(image!)} type="submit">Сохранить аватарку</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									</div>
									<div className={'flex flex-col gap-2 flex-7/10'}>
										<div className={'flex justify-between flex-col'}>
											<div className={'text-gray-400 text-base'}>Ваш номер карты:</div>
											<div>{user.numberCard}</div>
										</div>
										<div className={'flex justify-between flex-col'}>
											<div className={'text-gray-400 text-base'}>ФИО:</div>
											<div>{user.name}</div>
										</div>
										<div className={'flex justify-between flex-col'}>
											<div className={'text-gray-400 text-base'}>Ваша группа:</div>
											<div>{group && group.title}</div>
										</div>
										<div className={'flex justify-between flex-col'}>
											<div className={'text-gray-400 text-base'}>Текущий баланс:</div>
											<div>{user.quantityMoney} K</div>
										</div>
										<div className={'flex justify-between flex-col'}>
											<div className={'text-gray-400 text-base'}>Номер телефона:</div>
											<div>{user.phoneNumber ? user.phoneNumber : 'Отсутствует'}</div>
										</div>
									</div>
								</div>
							</div>
							<div className={'flex gap-2 mt-10 mb-3'}>
								<UserPanelForm/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserPanel