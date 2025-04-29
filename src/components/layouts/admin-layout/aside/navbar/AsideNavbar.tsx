import { PUBLIC_URL } from '@/src/config/url.config'
import {
  CalendarCheck,
  GraduationCap,
  KeyRound,
  ListOrdered,
  LogOut,
  Settings,
  ShoppingBasket,
  Store,
  UserCog,
  Users,
} from 'lucide-react'
import AsideNavbarItem from '@/src/components/layouts/admin-layout/aside/navbar/AsideNavbarItem'
import { Button } from '@/src/components/ui/Button'

const navbarInfo = [
  {
    title: 'Настройки города',
    link: PUBLIC_URL.admin('/settings-city'),
    icon: <Settings className={'size-6'}/>
  },
  {
    title: 'Пользователи',
    link: PUBLIC_URL.admin('/users'),
    icon: <GraduationCap className={'size-6'}/>
  },
  {
    title: 'Группы',
    link: PUBLIC_URL.admin('/groups'),
    icon: <Users className={'size-6'}/>
  },
  {
    title: 'Продукты магазина',
    link: PUBLIC_URL.admin('/products'),
    icon: <ShoppingBasket className={'size-6'}/>
  },
  {
    title: 'Заказы пользователей',
    link: PUBLIC_URL.admin('/orders'),
    icon: <ListOrdered className={'size-6'}/>
  },
	{
		title: 'В магазин кибер-товаров',
		link: PUBLIC_URL.home('/'),
		icon: <Store className={'size-6'}/>
	},
  {
    title: 'Выход из личного кабинета',
    link: PUBLIC_URL.admin('/auth'),
    icon: <LogOut className={'size-6'}/>
  }
]

const AsideNavbar = () => {
  return (
    <div>
      <ul className={'flex flex-col'}>
        {navbarInfo.map(item => (
          <AsideNavbarItem key={item.link} title={item.title} link={item.link} icon={item.icon}/>
        ))}
      </ul>
    </div>
  )
}

export default AsideNavbar