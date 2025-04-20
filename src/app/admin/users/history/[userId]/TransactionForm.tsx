"use client"
import { useState } from 'react'
import { Button } from '@/src/components/ui/Button'
import { Checkbox } from '@/src/components/ui/Checkbox'
import { Input } from '@/src/components/ui/form-elements/Input'
import { Label } from '@/src/components/ui/form-elements/Label'
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card'

type TransactionOperation = {
	description: string
	type: 'BONUS' | 'PURCHASE'
}

const operations = [
	{
		description: 'Посещение занятие',
		type: 'BONUS'
	},
	{
		description: 'Бонус>',
		type: 'BONUS'
	},
	{
		description: 'Быстрее всех завершил(а) задание',
		type: 'BONUS'
	},
	{
		description: 'Прошёл (прошла) модуль без замечаний по поведению',
		type: 'BONUS'
	},
	{
		description: 'Придумал(а) полезное правило для КИБЕРшколы',
		type: 'BONUS'
	},
	{
		description: 'Помог(ла) другу разобраться с заданием',
		type: 'BONUS'
	},
	{
		description: 'Прошёл (прошла) модуль без пропусков',
		type: 'BONUS'
	},
	{
		description: 'Помог(ла) ассистенту с уборкой',
		type: 'BONUS'
	},
	{
		description: 'Победа в конкурсе/олимпиаде',
		type: 'BONUS'
	},
	{
		description: 'Тщательно выполнил(а) гимнастику для глаз',
		type: 'BONUS'
	},
	{
		description: 'Написал(а) отзыв в социальных сетях',
		type: 'BONUS'
	},
	{
		description: 'Создал(а) дома самостоятельно проект и показал(а) тьютору',
		type: 'BONUS'
	},
	{
		description: 'Сделал(а) пост в социальных сетях о КИБЕРшколе',
		type: 'BONUS'
	},
	{
		description: 'Написал(а) отзыв о КИБЕРшколе на Google Картах',
		type: 'BONUS'
	},
	{
		description: 'Написал(а) отзыв о КИБЕРшколе на Яндекс Картах',
		type: 'BONUS'
	},
	{
		description: 'День рождения',
		type: 'BONUS'
	},
	{
		description: 'Своевременная оплата',
		type: 'BONUS'
	}
] as const

export const TransactionForm = () => {
	const [selectedOperations, setSelectedOperations] = useState<TransactionOperation[]>([])
	const [customBonus, setCustomBonus] = useState('')
	const [penaltyReason, setPenaltyReason] = useState('')
	const [penaltyAmount, setPenaltyAmount] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const transactions = [
			...selectedOperations,
			...(customBonus ? [{ description: customBonus, type: 'BONUS' }] : []),
			...(penaltyReason ? [{
				description: penaltyReason,
				type: 'PENALTY',
				amount: Number(penaltyAmount) || 0
			}] : [])
		]

		console.log('Отправляем на сервер:', { transactions })
		// Здесь будет вызов API: axios.post('/api/transactions', { transactions })
	}

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle>Операции с валютой</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Стандартные бонусы */}
					<div className="space-y-4">
						<Label>Стандартные начисления:</Label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{operations.map((op) => (
								<div key={op.description} className="flex items-center space-x-2">
									<Checkbox
										id={op.description}
										checked={selectedOperations.some(o => o.description === op.description)}
										onCheckedChange={(checked) => {
											if (checked) {
												setSelectedOperations(prev => [...prev, op])
											} else {
												setSelectedOperations(prev => prev.filter(o => o.description !== op.description))
											}
										}}
									/>
									<Label htmlFor={op.description} className="font-normal">
										{op.description}
									</Label>
								</div>
							))}
						</div>
					</div>

					{/* Кастомный бонус */}
					<div className="space-y-2">
						<Label htmlFor="custom-bonus">Другая причина начисления:</Label>
						<Input
							id="custom-bonus"
							value={customBonus}
							onChange={(e) => setCustomBonus(e.target.value)}
							placeholder="Опишите причину начисления..."
						/>
					</div>

					{/* Списание */}
					<div className="space-y-3">
						<Label htmlFor="penalty-reason">Причина списания:</Label>
						<Input
							id="penalty-reason"
							value={penaltyReason}
							onChange={(e) => setPenaltyReason(e.target.value)}
							placeholder="Например: Порча оборудования"
						/>

						{penaltyReason && (
							<div className="space-y-2">
								<Label htmlFor="penalty-amount">Сумма списания:</Label>
								<Input
									id="penalty-amount"
									type="number"
									min="0"
									value={penaltyAmount}
									onChange={(e) => setPenaltyAmount(e.target.value)}
									placeholder="Введите сумму"
								/>
							</div>
						)}
					</div>

					<Button type="submit" className="w-full">
						Сохранить операции
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}