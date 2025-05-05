import OrderModerator from '@/src/app/admin/orders/OrderModerator'

const Order = () => {
	return (
		<div className={'h-full text-black bg-white my-6'}>
			<div className={'container'}>
				<div className='flex items-center justify-between mb-4'>
					<h1 className={'title mb-5'}>Заказы всех пользователей</h1>
				</div>
				<OrderModerator />
			</div>
		</div>
	)
}

export default Order
