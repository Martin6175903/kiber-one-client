'use client'
import OrderModerator from '@/src/app/admin/orders/OrderModerator'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/src/components/ui/Select'
import { useGetGroups } from '@/src/hooks/queries/group/useGetGroups'
import { useState } from 'react'
import Link from 'next/link'
import { PUBLIC_URL } from '@/src/config/url.config'
import { Button } from '@/src/components/ui/Button'

const Order = () => {
  const {groups, isLoading} = useGetGroups()

  const [selectGroup, setSelectGroup] = useState('all')

  return (
    <div className={'h-full text-black bg-white my-6'}>
      <div className={'container'}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={'title mb-5'}>
            Заказы всех пользователей
          </h1>
        </div>
        <div className={'flex justify-between'}>
          <div className={'mb-5 flex items-center gap-1'}>
            <p>
              Фильтрация заказов по группам:
            </p>
            <Select defaultValue={selectGroup} onValueChange={setSelectGroup}>
              <SelectTrigger className="w-[280px] cursor-pointer">
                <SelectValue placeholder="Выберите группу" />
              </SelectTrigger>
              <SelectContent className={'cursor-pointer'}>
                <SelectGroup>
                  <SelectLabel>Группы</SelectLabel>
                  <SelectItem value="all">Все</SelectItem>
                  {!isLoading && groups && groups.map((group) => (
                    <SelectItem value={group.id!} key={group.id!}>{group.title}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Link href={PUBLIC_URL.admin('/orders/aggregate-orders')}>Статистика заказов</Link>
          </Button>
        </div>
        <OrderModerator selectGroup={selectGroup}/>
      </div>
    </div>
  )
}

export default Order