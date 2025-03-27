import { Facebook, Linkedin, Youtube } from "lucide-react"
import Link from 'next/link'

const Footer = () => {
	return (
		<footer className={'bg-linear-[0deg,#282828_0%,#080808_24%,#010101_60%,#131010_100%] pt-15 pb-5 text-white'}>
			<div className="container">
				<div className={'grid grid-cols-3'}>
					<div>
						<h3 className={'text-3xl font-semibold'}>Контакты</h3>
						<p className={'mt-2.5 mb-5'}>
							Мы всегда стремимся оперативно собрать и отправить ваш заказ, звоните и пишите нам по любым вопросам.
						</p>
						<div className={'flex gap-5 items-center'}>
							<Link href={'#'} className={'size-9 rounded-full bg-white flex items-center justify-center duration-300 hover:scale-110'}>
								<Facebook className={'text-black'}/>
							</Link>
							<Link href={'#'} className={'size-9 rounded-full bg-white flex items-center justify-center duration-300 hover:scale-110'}>
								<Youtube  className={'text-black'}/>
							</Link>
							<Link href={'#'} className={'size-9 rounded-full bg-white flex items-center justify-center duration-300 hover:scale-110'}>
								<Linkedin className={'text-black'}/>
							</Link>
						</div>
					</div>
					<div>
						<strong>E-mail:</strong> marketing@kiber-one.com <br/>
						<strong>Адрес:</strong> г. Екатеринбург, ул. Сакко и Ванцетти, 64, оф.301 <br/>
						<strong>Индивидуальный предприниматель:</strong> Апалькова Ольга Сергеевна, Д.У.
					</div>
					<div className={'text-sm'}>
						Адрес: <strong></strong> г. Екатеринбург, Московская 66-159 <br/>
						<strong>ИНН:</strong> 660903120896, ОГРНИП 319665800050687 <br/>
						р/с:<strong></strong> 40802810302500047050 <br/>
						БАНК ОТКРЫТИЕ <br/>
						<strong>БИК:</strong> 044525999 <br/>
						<strong>Город:</strong> Москва <br/>
						<strong>Корр. счёт:</strong> 30101810845250000999 <br/>
						в ГУ БАНКА РОССИИ ПО ЦФО
					</div>
				</div>
				<div className={'mt-20 text-[#888888] text-center'}>
					По всем вопросам можно обратиться в Telegram-бот KIBERone. <br/>
					Напоминаем, что у резидентов личный зачет киберонов! Нельзя объединяться и складываться!
				</div>
			</div>
		</footer>
	)
}

export default Footer