'use client'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { useUserContext } from '@/src/providers/user.context'
import { useGetGroup } from '@/src/hooks/queries/group/useGetGroup'
import { useEffect, useState } from 'react'
import { IGroup } from '@/src/shared/types/group.types'
import { Input } from '@/src/components/ui/form-elements/Input'
import { Label } from '@/src/components/ui/form-elements/Label'

const UserPanel = () => {
	const { user } = useUserContext()
	const [groupId, setGroupId] = useState<string>("")
	const {group} = useGetGroup(groupId)

	useEffect(() => {
		if (user) {
			setGroupId(user.groupId!)
		}
	}, [user])
	return (
		<div className={'h-full mt-8 text-black flex items-center'}>
			<div className={'container'}>
				<div className={'flex flex-col gap-7'}>
					<h1 className={'text-4xl font-bold'}>Ваши данные:</h1>
					{user && (
						<div className={'py-7 px-2 border-2 border-solid border-darkyellow/25 rounded-md shadow-[2px_2px_10px_rgba(0,0,0,0.3),-2px_-2px_10px_rgba(0,0,0,0.3)]'}>
							<div className={'text-xl flex flex-col gap-2'}>
								<div className={'flex flex-col gap-2'}>
									<div className={'w-2/5 flex justify-between'}>
										<div className={'font-bold'}>Ваш номер карты:</div>
										<div>{user.numberCard}</div>
									</div>
									<div className={'w-2/5 flex justify-between'}>
										<div className={'font-bold'}>ФИО:</div>
										<div>{user.name}</div>
									</div>
									<div className={'w-2/5 flex justify-between'}>
										<div className={'font-bold'}>Ваша группа:</div>
										<div>{group && group.title}</div>
									</div>
									<div className={'w-2/5 flex justify-between'}>
										<div className={'font-bold'}>Текущий баланс:</div>
										<div>{user.quantityMoney} K</div>
									</div>
									<div className={'w-2/5 flex justify-between'}>
										<div className={'font-bold'}>Номер телефона:</div>
										<div>{user.phoneNumber}</div>
									</div>
									<div className={'w-2/5 flex gap-2 mt-10'}>
										<Label className={'text-xl w-full'} htmlFor={'change-password'}>Изменение пароля: </Label>
										<div className={'w-full'}>
											<Input className={'border-gray-600'} id={'change-password'} />
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserPanel