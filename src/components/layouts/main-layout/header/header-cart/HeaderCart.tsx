'use client'

import {
	Sheet, SheetClose,
	SheetContent,
	SheetDescription, SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/src/components/ui/Sheet'
import { PropsWithChildren } from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/src/components/ui/form-elements/Input"
import { Button } from '@/src/components/ui/Button'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'


const HeaderCart = ({children}: PropsWithChildren) => {
	return (
		<Sheet>
			<SheetTrigger className={'cursor-pointer'}>{children}</SheetTrigger>
			<SheetContent className={'px-4 bg-black text-white border-l-gray-700'}>
				<SheetHeader>
					<SheetTitle className={'uppercase font-bold text-4xl text-center text-white bg-clip-text text-transparent bg-linear-[-86deg,#282828_0%,#E5CBCB_37%,#FCE24E_47%,#E4DEDE_54%,#FCE24E_66%,#282828_100%]'}>Корзина</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">

				</div>
				<SheetFooter>
					<Link href={'/basket'} className={'mx-auto'}>
						<Button className={'cursor-pointer duration-400 bg-white text-black border-solid border border-transparent group/edit hover:border-white hover:text-white hover:bg-black'}>
							<span>Перейти в корзину</span>
							<MoveRight className={'group-hover/edit:ml-3 duration-400'}/>
						</Button>
					</Link>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default HeaderCart