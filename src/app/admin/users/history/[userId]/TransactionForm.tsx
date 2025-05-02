'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/src/components/ui/Button'
import { Checkbox } from '@/src/components/ui/Checkbox'
import { Input } from '@/src/components/ui/form-elements/Input'
import { Label } from '@/src/components/ui/form-elements/Label'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card'
import { DialogClose } from '@/src/components/ui/Dialog'
import { useCreateTransaction } from '@/src/hooks/queries/transaction/useCreateTransaction'
import { EnumTypeTransaction, ITransactionInput } from '@/src/shared/types/transaction.types'
import {
	AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/src/components/ui/AlertDialog'
import { ArrowRightLeft, Banknote, ScanBarcode } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/src/components/ui/input-otp'

const operations = [
	{
		description: 'Посещение занятия',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 10
	},
	{
		description: 'Бонус',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 5
	},
	{
		description: 'Быстрее всех завершил(а) задание',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 5
	},
	{
		description: 'Прошёл (прошла) модуль без замечаний по поведению',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 5
	},
	{
		description: 'Придумал(а) полезное правило для КИБЕРшколы',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 10
	},
	{
		description: 'Помог(ла) другу разобраться с заданием',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 5
	},
	{
		description: 'Прошёл (прошла) модуль без пропусков',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 5
	},
	{
		description: 'Помог(ла) ассистенту с уборкой',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 5
	},
	{
		description: 'Победа в конкурсе/олимпиаде',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 15
	},
	{
		description: 'Тщательно выполнил(а) гимнастику для глаз',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 5
	},
	{
		description: 'Написал(а) отзыв в социальных сетях',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 15
	},
	{
		description: 'Создал(а) дома самостоятельно проект и показал(а) тьютору',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 15
	},
	{
		description: 'Сделал(а) пост в социальных сетях о КИБЕРшколе',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 15
	},
	{
		description: 'Написал(а) отзыв о КИБЕРшколе на Google Картах',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 15
	},
	{
		description: 'Написал(а) отзыв о КИБЕРшколе на Яндекс Картах',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 15
	},
	{
		description: 'День рождения',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 30
	},
	{
		description: 'Своевременная оплата',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 15
	},
	{
		description: 'Другая причина начисления',
		type: EnumTypeTransaction.BONUS,
		quantityMoney: 0
	}
]

export const TransactionForm = () => {
	const [selectedOperations, setSelectedOperations] = useState<ITransactionInput[]>([operations[0]])
	// Логика работы кастомный операций
	const [customBonus, setCustomBonus] = useState('')
	const [customBonusQuantity, setCustomBonusQuantity] = useState(0)
	const [purchaseReason, setPurchaseReason] = useState('')
	const [purchaseReasonQuantity, setPurchaseReasonQuantity] = useState(0)
	const [isCheckedItemOther, setIsCheckedItemOther] = useState(false)

	const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false)

	const { createTransaction } = useCreateTransaction()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const transactions = [
			...selectedOperations.filter(operation => operation.description !== 'Другая причина начисления'),
			...(customBonus ? [{ description: customBonus, type: EnumTypeTransaction.BONUS, quantityMoney: +customBonusQuantity }] : []),
			...(purchaseReason ? [{ description: purchaseReason, type: EnumTypeTransaction.PURCHASE, quantityMoney: +purchaseReasonQuantity }] : [])
		] as ITransactionInput[]

		if (transactions.length === 0) return false

		createTransaction(transactions)
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Операции с валютой</CardTitle>
			</CardHeader>
			<CardContent>
				<form id={'transaction__form'} onSubmit={handleSubmit} className="space-y-6">
					{/* Стандартные бонусы */}
					<div className="space-y-4">
						<Label>Стандартные начисления:</Label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
							{operations.map((op) => (
								<div key={op.description} className="flex items-center space-x-2 group cursor-pointer">
									<Checkbox
										className={'cursor-pointer duration-300 group-hover:scale-105 '}
										id={op.description}
										checked={selectedOperations.some(o => o.description === op.description)}
										onCheckedChange={(checked) => {
											if (checked) {
												if (op.description === 'Другая причина начисления') setIsCheckedItemOther(true)
												setSelectedOperations((prev) => [...prev, op] as ITransactionInput[])
											} else {
												setSelectedOperations(prev => prev.filter(o => o.description !== op.description))
												if (op.description === 'Другая причина начисления') {
													setIsCheckedItemOther(false)
													setCustomBonus('')
												}
											}
										}}
									/>
									<Label htmlFor={op.description} className="font-normal duration-300 cursor-pointer group-hover:scale-105">
										<span>{op.description}{op.description !== 'Другая причина начисления' && <span className={'font-bold text-nowrap'}>({op.quantityMoney} K)</span>}</span>
									</Label>
								</div>
							))}
						</div>
					</div>

					{isCheckedItemOther && (
						<div className="space-y-2 grid grid-cols-2 gap-5">
							<div>
								<Label htmlFor="custom-bonus" className={'mb-2'}>Другая причина начисления:</Label>
								<Input id="custom-bonus" value={customBonus} onChange={(e) => setCustomBonus(e.target.value)}
											 placeholder="Опишите причину начисления..."
								/>
							</div>
							<div>
								<Label htmlFor="custom-bonus-quantity" className={'mb-2'}>Количество валюты:</Label>
								<Input id="custom-bonus-quantity" type={'number'} value={customBonusQuantity}
											 onChange={(e) => setCustomBonusQuantity(+e.target.value)}
											 placeholder="Количество валюты..."
								/>
							</div>
						</div>
					)}

					{/* Списание */}
					<div className="space-y-3 grid grid-cols-2 gap-5">
						<div>
							<Label htmlFor="penalty-reason" className={'mb-2'}>Причина списания:</Label>
							<Input
								id="penalty-reason"
								value={purchaseReason}
								onChange={(e) => setPurchaseReason(e.target.value)}
								placeholder="Опишите причину списания..."
							/>
						</div>
						<div>
							<Label htmlFor="custom-bonus-quantity" className={'mb-2'}>Количество валюты:</Label>
							<Input id="custom-bonus-quantity" type={'number'} value={purchaseReasonQuantity}
										 onChange={(e) => setPurchaseReasonQuantity(+e.target.value)}
										 placeholder="Количество валюты..."
							/>
						</div>
					</div>

					<Button id={'save-transactions-btn'} className={'hidden'} type={'submit'}>Сохранить транзакции</Button>

					<div className={'flex justify-center'}>
						<AlertDialog open={isOpenAlertDialog}>
							<AlertDialogTrigger asChild>
								<Button onClick={() => setIsOpenAlertDialog(true)} type={'button'} className={'cursor-pointer'}>Зачислить на карту</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle className={'flex gap-3 items-center justify-between'}>
										<span>Приложите карту к терминалу</span>
										<div className={'flex items-center gap-2'}>
											<Banknote className={'size-6 text-green-600'}/>
											<ArrowRightLeft className={'size-5 text-zinc-600/75'}/>
											<ScanBarcode className={'size-6 text-zinc-800'}/>
										</div>
									</AlertDialogTitle>
									<AlertDialogDescription asChild>
										<InputOTP aria-label={'input-otp'} autoFocus={isOpenAlertDialog} maxLength={10} onKeyDown={(e) => {
											if (e.key === 'Enter') {
												setIsOpenAlertDialog(false);
												document.getElementById('save-transactions-btn')?.click()
											}
										}}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
												<InputOTPSlot index={6} />
												<InputOTPSlot index={7} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={8} />
												<InputOTPSlot index={9} />
											</InputOTPGroup>
										</InputOTP>
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel onClick={() => setIsOpenAlertDialog(false)} className={'cursor-pointer'}>Отмена операции</AlertDialogCancel>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}