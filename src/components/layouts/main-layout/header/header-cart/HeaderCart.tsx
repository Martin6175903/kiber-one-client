'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/Sheet'
import { PropsWithChildren, useState } from 'react'
import { Button } from '@/src/components/ui/Button'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import { useCard } from '@/src/hooks/useCard'
import CardItem from '@/src/components/layouts/main-layout/header/header-cart/card-item/CardItem'
import { PUBLIC_URL } from '@/src/config/url.config'

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const HeaderCart = ({ children }: PropsWithChildren) => {

  const [isOpen, setIsOpen] = useState(false)

  const { items, total } = useCard()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={'cursor-pointer'}>{children}</SheetTrigger>
      <SheetContent className={'px-4 bg-black text-white max-sm:border-none sm:border-l-gray-700 h-full flex flex-col max-sm:w-full'}>
        <SheetHeader>
          <SheetTitle
            className={'uppercase font-bold text-4xl text-center bg-clip-text text-transparent bg-linear-[-86deg,#282828_0%,#E5CBCB_37%,#FCE24E_47%,#E4DEDE_54%,#FCE24E_66%,#282828_100%]'}>Корзина</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className={'flex flex-col w-full flex-1'}>
          {items.length ? (
            items.map(item => (
              <CardItem item={item} key={item.product.id} />
            ))
          ) : (
            <div className={'text-sm text-muted-foreground'}>Корзина пустая!</div>
          )}
        </div>
        {items.length ? (
          <>
            <div className="text-lg font-medium text-center">
              Итоговая стоимость: {total} K
            </div>
          </>
        ) : null}
        <SheetFooter>
          <Link href={PUBLIC_URL.order()} className={'mx-auto'}>
            <Button
              onClick={() => setIsOpen(false)}
              className={'cursor-pointer duration-400 bg-white text-black border-solid border border-transparent group/edit hover:border-white hover:text-white hover:bg-black'}>
              <span>Перейти в корзину</span>
              <MoveRight className={'group-hover/edit:ml-3 duration-400'} />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default HeaderCart