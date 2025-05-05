const Delivery = () => {
	return (
		<section
			className={
				'py-21 bg-linear-to-t from-[#1E1010] to-[171717] text-white text-center'
			}
		>
			<div className='container'>
				<h3 className={'uppercase text-2xl sm:text-4xl font-bold'}>
					О Доставке
				</h3>
				<p
					className={
						'my-6 text-xs sm:text-base md:text-xl md:max-w-3/4 mx-auto text-white/90'
					}
				>
					После оформления заказа, менеджер обработает его и обозначит дату его
					прибытия. Когда заказ поступит на локацию, менеджер свяжется с вами.
					После оповещения о прибытии заказа, его можно будет забрать на вашей
					локации.
				</p>
				<p className={'text-lg sm:text-3xl'}>
					Спасибо, что обратились в KIBERshop! <br /> Мы стараемся для вас 🙌🏻
				</p>
			</div>
		</section>
	)
}

export default Delivery
