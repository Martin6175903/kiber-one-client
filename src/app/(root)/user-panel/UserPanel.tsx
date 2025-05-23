'use client'
import { useUserContext } from '@/src/providers/user.context'
import { useGetGroup } from '@/src/hooks/queries/group/useGetGroup'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import UserPanelForm from '@/src/app/(root)/user-panel/UserPanelForm'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'

const UserPanel = () => {
	const { user } = useUserContext()
	const {group} = useGetGroup(user?.groupId!)

	return (
		<div className={'h-full mt-8 text-black flex items-center'}>
			<div className={'container'}>
				<div className={'flex flex-col gap-7'}>
					<div className={'flex justify-between items-center'}>
						<h1 className={'text-4xl font-bold'}>Личный кабинет</h1>
						<Link className={'duration-300 hover:scale-105'} href={PUBLIC_URL.home()}>
							<Button>История операций</Button>
						</Link>
					</div>
					{user && (
						<div>
							<div className={'py-7 px-2 border-2 border-solid border-darkyellow/25 rounded-md shadow-[2px_2px_10px_rgba(0,0,0,0.3),-2px_-2px_10px_rgba(0,0,0,0.3)]'}>
								<div className={'text-xl flex justify-center items-center gap-30'}>
									<div className={'flex-3/10 flex justify-center'}>
										<Image src={'/images/user-icon.svg'} alt={'User Icon'} width={250} height={250}/>
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
											<div>{user.phoneNumber}</div>
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